import * as Repository from './administrative-helper-documents.repository.js';

export const getDocuments = async (filters) => {
  return await Repository.findAll(filters);
};

export const getDocumentById = async (id) => {
  return await Repository.findById(id);
};

export const createDraft = async (data) => {
  // Simple code generation if not provided
  if (!data.documentCode) {
    const prefix = data.type === 'INVOICE' ? 'INV' : data.type === 'BAST' ? 'BAST' : 'LEGAL';
    data.documentCode = `${prefix}-DRAFT-${Date.now()}`;
  }
  return await Repository.create(data);
};

export const patchStatus = async (id, status) => {
  return await Repository.updateStatus(id, status);
};
