import * as Service from './administrative-helper-documents.service.js';

export const list = async (req, res) => {
  try {
    const { projectId, customerId, type, status } = req.query;
    const documents = await Service.getDocuments({ projectId, customerId, type, status });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const detail = async (req, res) => {
  try {
    const document = await Service.getDocumentById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const document = await Service.createDraft(req.body);
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const document = await Service.patchStatus(req.params.id, status);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const document = await Service.updateDocument(req.params.id, req.body);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
