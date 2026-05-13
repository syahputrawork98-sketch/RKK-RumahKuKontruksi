import * as Repository from './administrative-helper-documents.repository.js';
import { createNotification } from '../notifications/notifications.service.js';

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
  const document = await Repository.updateStatus(id, status);

  if (status === 'released') {
    // Fetch full detail for notification
    const detail = await Repository.findById(id);
    if (detail && detail.customerId) {
      try {
        await createNotification({
          recipientRole: 'customer',
          recipientId: detail.customerId,
          actorRole: 'admin',
          actorId: detail.createdById,
          eventType: 'DOCUMENT_RELEASED',
          entityType: 'AdministrativeHelperDocument',
          entityId: detail.id,
          title: 'Dokumen Baru Dirilis',
          message: `Admin telah merilis dokumen "${detail.title}" untuk proyek Anda.`,
          linkPath: '/konsumen/dokumen'
        });
      } catch (err) {
        console.error('Document Notification Error:', err);
      }
    }
  }

  return document;
};

export const updateDocument = async (id, data) => {
  return await Repository.update(id, data);
};

