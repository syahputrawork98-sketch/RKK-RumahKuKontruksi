import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDocuments = async (filters = {}) => {
  const where = {};
  
  if (filters.projectId) where.projectId = filters.projectId;
  if (filters.category) where.category = filters.category;
  if (filters.visibility) where.visibility = filters.visibility;
  if (filters.uploadedByRole) where.uploadedByRole = filters.uploadedByRole;
  if (filters.uploadedById) where.uploadedById = filters.uploadedById;
  if (filters.status) where.status = filters.status;
  if (filters.stageId) where.stageId = filters.stageId;

  const documents = await prisma.projectDocument.findMany({
    where,
    include: {
      project: {
        select: {
          id: true,
          projectCode: true,
          name: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });


  return documents;
};

export const getDocumentById = async (id) => {
  const document = await prisma.projectDocument.findUnique({
    where: { id }
  });

  if (!document) {
    throw new Error('Document not found');
  }

  return document;
};

export const createDocument = async (data) => {
  const document = await prisma.projectDocument.create({
    data
  });

  return document;
};

export const updateDocumentStatus = async (id, status) => {
  const document = await prisma.projectDocument.update({
    where: { id },
    data: { status }
  });

  return document;
};

export const deleteDocument = async (id) => {
  await prisma.projectDocument.delete({
    where: { id }
  });

  return { success: true };
};
