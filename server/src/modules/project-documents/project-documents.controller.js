import * as projectDocumentService from './project-documents.service.js';

export const getDocuments = async (req, res) => {
  try {
    const filters = {
      projectId: req.query.projectId,
      category: req.query.category,
      visibility: req.query.visibility,
      uploadedByRole: req.query.uploadedByRole,
      uploadedById: req.query.uploadedById,
      status: req.query.status,
      stageId: req.query.stageId
    };

    const documents = await projectDocumentService.getDocuments(filters);
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const document = await projectDocumentService.getDocumentById(req.params.id);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const document = await projectDocumentService.createDocument(req.body);
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateDocumentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const document = await projectDocumentService.updateDocumentStatus(req.params.id, status);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    await projectDocumentService.deleteDocument(req.params.id);
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
