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
  return await prisma.rabItem.create({ data });
};

export const updateItem = async (id, data) => {
  return await prisma.rabItem.update({
    where: { id },
    data
  });
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
  const subtotal = items.reduce((sum, item) => sum.add(item.total), new prisma.Prisma.Decimal(0));
  
  return await prisma.rabCategory.update({
    where: { id: categoryId },
    data: { subtotal }
  });
};

export const syncPlanTotal = async (rabPlanId) => {
  const categories = await prisma.rabCategory.findMany({
    where: { rabPlanId }
  });
  const totalAmount = categories.reduce((sum, cat) => sum.add(cat.subtotal), new prisma.Prisma.Decimal(0));
  
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
