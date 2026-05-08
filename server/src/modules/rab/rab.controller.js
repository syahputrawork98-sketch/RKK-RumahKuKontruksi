import * as RabRepository from './rab.repository.js';
import * as ProjectRepository from '../projects/projects.repository.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';

// Helper for ownership check
const checkOwnership = async (projectId, adminId) => {
  if (!adminId) return true; // Skip if no adminId (though expected in this task)
  const project = await ProjectRepository.findById(projectId);
  if (!project) return false;
  return project.adminId === adminId;
};

const forbiddenResponse = (res) => {
  return res.status(403).json({
    success: false,
    message: 'Anda tidak memiliki akses ke RAB project ini.',
  });
};

// Plan
export const getRabByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { adminId } = req.query;

    if (adminId && !(await checkOwnership(projectId, adminId))) {
      return forbiddenResponse(res);
    }

    const plan = await RabRepository.findPlanByProjectId(projectId);
    res.json({
      success: true,
      data: serializeDecimal(plan),
    });
  } catch (error) {
    next(error);
  }
};

export const createRabPlan = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, type, adminId, ...rest } = req.body;

    if (!title || !type) {
      return res.status(400).json({ success: false, message: 'title and type are required' });
    }

    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (adminId && project.adminId !== adminId) {
      return forbiddenResponse(res);
    }

    const plan = await RabRepository.createPlan({
      projectId,
      title,
      type,
      status: 'draft',
      ...rest
    });

    res.status(201).json({ success: true, data: serializeDecimal(plan) });
  } catch (error) {
    next(error);
  }
};

export const updateRabPlan = async (req, res, next) => {
  try {
    const { rabPlanId } = req.params;
    const { adminId, ...data } = req.body;

    const plan = await RabRepository.findPlanById(rabPlanId);
    if (!plan) return res.status(404).json({ success: false, message: 'RAB Plan not found' });

    if (adminId && !(await checkOwnership(plan.projectId, adminId))) {
      return forbiddenResponse(res);
    }

    const updated = await RabRepository.updatePlan(rabPlanId, data);
    res.json({ success: true, data: serializeDecimal(updated) });
  } catch (error) {
    next(error);
  }
};

// Category
export const createRabCategory = async (req, res, next) => {
  try {
    const { rabPlanId } = req.params;
    const { code, name, adminId, ...rest } = req.body;

    if (!code || !name) {
      return res.status(400).json({ success: false, message: 'code and name are required' });
    }

    const plan = await RabRepository.findPlanById(rabPlanId);
    if (!plan) return res.status(404).json({ success: false, message: 'RAB Plan not found' });

    if (adminId && !(await checkOwnership(plan.projectId, adminId))) {
      return forbiddenResponse(res);
    }

    const category = await RabRepository.createCategory({
      rabPlanId,
      projectId: plan.projectId,
      code,
      name,
      ...rest
    });

    res.status(201).json({ success: true, data: serializeDecimal(category) });
  } catch (error) {
    next(error);
  }
};

export const updateRabCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { adminId, ...data } = req.body;

    const category = await RabRepository.findCategoryById(categoryId);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    if (adminId && !(await checkOwnership(category.projectId, adminId))) {
      return forbiddenResponse(res);
    }

    const updated = await RabRepository.updateCategory(categoryId, data);
    
    // Sync totals
    await RabRepository.syncPlanTotal(updated.rabPlanId);
    
    res.json({ success: true, data: serializeDecimal(updated) });
  } catch (error) {
    next(error);
  }
};

export const deleteRabCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { adminId } = req.query;

    const category = await RabRepository.findCategoryById(categoryId);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    if (adminId && !(await checkOwnership(category.projectId, adminId))) {
      return forbiddenResponse(res);
    }

    await RabRepository.removeCategory(categoryId);
    await RabRepository.syncPlanTotal(category.rabPlanId);

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};

// Item
export const createRabItem = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { description, volume, unit, unitPrice, adminId, ...rest } = req.body;

    if (!description || volume === undefined || !unit || unitPrice === undefined) {
      return res.status(400).json({ success: false, message: 'description, volume, unit, and unitPrice are required' });
    }

    const category = await RabRepository.findCategoryById(categoryId);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    if (adminId && !(await checkOwnership(category.projectId, adminId))) {
      return forbiddenResponse(res);
    }

    const item = await RabRepository.createItem({
      categoryId,
      rabPlanId: category.rabPlanId,
      projectId: category.projectId,
      description,
      volume,
      unit,
      unitPrice,
      status: 'pending',
      ...rest
    });

    // Sync totals
    await RabRepository.syncCategorySubtotal(categoryId);
    await RabRepository.syncPlanTotal(category.rabPlanId);

    res.status(201).json({ success: true, data: serializeDecimal(item) });
  } catch (error) {
    next(error);
  }
};

export const updateRabItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { volume, unitPrice, adminId, ...data } = req.body;

    const existing = await RabRepository.findItemById(itemId);
    if (!existing) return res.status(404).json({ success: false, message: 'Item not found' });

    if (adminId && !(await checkOwnership(existing.projectId, adminId))) {
      return forbiddenResponse(res);
    }

    // Fix: Re-include volume and unitPrice in update data
    const updatePayload = { ...data };
    if (volume !== undefined) updatePayload.volume = volume;
    if (unitPrice !== undefined) updatePayload.unitPrice = unitPrice;

    const updated = await RabRepository.updateItem(itemId, updatePayload);

    // Sync totals
    await RabRepository.syncCategorySubtotal(updated.categoryId);
    await RabRepository.syncPlanTotal(updated.rabPlanId);

    res.json({ success: true, data: serializeDecimal(updated) });
  } catch (error) {
    next(error);
  }
};

export const deleteRabItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { adminId } = req.query;

    const item = await RabRepository.findItemById(itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    if (adminId && !(await checkOwnership(item.projectId, adminId))) {
      return forbiddenResponse(res);
    }

    await RabRepository.removeItem(itemId);
    await RabRepository.syncCategorySubtotal(item.categoryId);
    await RabRepository.syncPlanTotal(item.rabPlanId);

    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
};
