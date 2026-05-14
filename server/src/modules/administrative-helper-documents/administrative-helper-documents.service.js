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
  // 1. Get current document to validate transition
  const currentDoc = await Repository.findById(id);
  if (!currentDoc) {
    throw new Error('Document not found');
  }

  const currentStatus = currentDoc.status;

  // 2. Validate Transitions
  // draft -> reviewed
  if (currentStatus === 'draft' && status !== 'reviewed') {
    throw new Error('Draft document can only transition to reviewed');
  }
  
  // reviewed -> released
  if (currentStatus === 'reviewed' && status !== 'released') {
    // If status is still reviewed, no error, just return (or let it pass)
    if (status !== 'reviewed') {
      throw new Error('Reviewed document can only transition to released');
    }
  }

  // released is final
  if (currentStatus === 'released' && status !== 'released') {
    throw new Error('Released document status cannot be changed');
  }

  // Prevent skipping: draft cannot go directly to released
  if (currentStatus === 'draft' && status === 'released') {
    throw new Error('Draft document must be reviewed before release');
  }

  // Prevent backward transition (explicitly mentioned in rules)
  const statusPriority = { 'draft': 1, 'reviewed': 2, 'released': 3, 'archived': 4 };
  if (statusPriority[status] < statusPriority[currentStatus]) {
    throw new Error(`Cannot move status back from ${currentStatus} to ${status}`);
  }

  if (status === currentStatus) {
    return currentDoc;
  }

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

