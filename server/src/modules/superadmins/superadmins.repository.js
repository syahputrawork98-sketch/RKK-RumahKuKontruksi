import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.superadmin.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
  });
};

export const findById = async (id) => {
  return await prisma.superadmin.findUnique({
    where: { id, deletedAt: null }
  });
};

export const findByEmail = async (email) => {
  return await prisma.superadmin.findFirst({
    where: { email, deletedAt: null }
  });
};

export const create = async (data) => {
  return await prisma.superadmin.create({ data });
};

export const update = async (id, data) => {
  return await prisma.superadmin.update({
    where: { id },
    data
  });
};

export const softDelete = async (id) => {
  return await prisma.superadmin.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'inactive'
    }
  });
};
