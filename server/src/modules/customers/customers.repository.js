import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.customer.findMany({
    orderBy: { name: 'asc' },
  });
};

export const findById = async (id) => {
  return await prisma.customer.findUnique({
    where: { id },
    include: {
      _count: {
        select: { projects: true }
      }
    },
  });
};

export const findByEmail = async (email) => {
  return await prisma.customer.findFirst({
    where: { email },
  });
};

export const create = async (data) => {
  return await prisma.customer.create({
    data,
  });
};

export const update = async (id, data) => {
  return await prisma.customer.update({
    where: { id },
    data,
  });
};

export const remove = async (id) => {
  return await prisma.customer.delete({
    where: { id },
  });
};
