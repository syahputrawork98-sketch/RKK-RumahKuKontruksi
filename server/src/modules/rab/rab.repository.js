import pkg from '@prisma/client';
const { Prisma } = pkg;
import prisma from '../../config/prisma.js';

// Plan
export const findPlanByProjectId = async (projectId) => {
  return await prisma.rabPlan.findFirst({
    where: { projectId },
    include: {
      categories: {
        orderBy: { order: 'asc' },
        include: {
          items: {
            orderBy: { id: 'asc' }
          }
        }
      }
    }
  });
};

export const findPlanById = async (id) => {
  return await prisma.rabPlan.findUnique({
    where: { id },
    include: {
      categories: {
        orderBy: { order: 'asc' },
        include: {
          items: {
            orderBy: { id: 'asc' }
          }
        }
      }
    }
  });
};

export const createPlan = async (data) => {
  return await prisma.rabPlan.create({ data });
};

export const updatePlan = async (id, data) => {
  return await prisma.rabPlan.update({
    where: { id },
    data
  });
};

// Category
export const findCategoryById = async (id) => {
  return await prisma.rabCategory.findUnique({
    where: { id },
  });
};

export const createCategory = async (data) => {
  return await prisma.rabCategory.create({ data });
};

export const updateCategory = async (id, data) => {
  return await prisma.rabCategory.update({
    where: { id },
    data
  });
};

export const isCategoryInUse = async (id) => {
  const itemsCount = await prisma.rabItem.count({
    where: { categoryId: id }
  });
  return itemsCount > 0;
};

export const removeCategory = async (id) => {
  return await prisma.rabCategory.delete({
    where: { id },
  });
};

// Item
export const findItemById = async (id) => {
  return await prisma.rabItem.findUnique({
    where: { id },
  });
};

export const createItem = async (data) => {
  // Normalize payload with Decimal
  const volume = new Prisma.Decimal(data.volume || 0);
  const unitPrice = new Prisma.Decimal(data.unitPrice || 0);
  const total = volume.mul(unitPrice);

  return await prisma.rabItem.create({ 
    data: {
      ...data,
      volume,
      unitPrice,
      total
    } 
  });
};

export const updateItem = async (id, data) => {
  const updateData = { ...data };

  // If volume or unitPrice is updated, recalculate total
  if (data.volume !== undefined || data.unitPrice !== undefined) {
    const existing = await prisma.rabItem.findUnique({ where: { id } });
    const volume = new Prisma.Decimal(data.volume !== undefined ? data.volume : (existing.volume || 0));
    const unitPrice = new Prisma.Decimal(data.unitPrice !== undefined ? data.unitPrice : (existing.unitPrice || 0));
    updateData.total = volume.mul(unitPrice);
    updateData.volume = volume;
    updateData.unitPrice = unitPrice;
  }

  return await prisma.rabItem.update({
    where: { id },
    data: updateData
  });
};

export const isItemInUse = async (id) => {
  const [mrItem, activity] = await Promise.all([
    prisma.materialRequestItem.findFirst({ where: { rabItemId: id } }),
    prisma.weeklyJournalActivity.findFirst({ where: { rabItemId: id } })
  ]);
  return !!(mrItem || activity);
};

export const removeItem = async (id) => {
  return await prisma.rabItem.delete({
    where: { id },
  });
};

// Agregasi
export const syncCategorySubtotal = async (categoryId) => {
  const items = await prisma.rabItem.findMany({
    where: { categoryId }
  });
  
  const subtotal = items.reduce(
    (sum, item) => sum.add(item.total || 0), 
    new Prisma.Decimal(0)
  );
  
  return await prisma.rabCategory.update({
    where: { id: categoryId },
    data: { subtotal }
  });
};

export const syncPlanTotal = async (rabPlanId) => {
  const categories = await prisma.rabCategory.findMany({
    where: { rabPlanId }
  });
  
  const totalAmount = categories.reduce(
    (sum, cat) => sum.add(cat.subtotal || 0), 
    new Prisma.Decimal(0)
  );
  
  const updatedPlan = await prisma.rabPlan.update({
    where: { id: rabPlanId },
    data: { totalAmount }
  });

  // Sync Project budgetTotal as well
  await prisma.project.update({
    where: { id: updatedPlan.projectId },
    data: { budgetTotal: totalAmount }
  });

  return updatedPlan;
};
