import * as RabRepository from './rab.repository.js';
import * as ProjectRepository from '../projects/projects.repository.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';

// Plan
export const getRabByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
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
    const { title, type, ...rest } = req.body;

    if (!title || !type) {
      return res.status(400).json({ success: false, message: 'title and type are required' });
    }

    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
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
    const updated = await RabRepository.updatePlan(rabPlanId, req.body);
    res.json({ success: true, data: serializeDecimal(updated) });
  } catch (error) {
    next(error);
  }
};

// Category
export const createRabCategory = async (req, res, next) => {
  try {
    const { rabPlanId } = req.params;
    const { code, name, ...rest } = req.body;

    if (!code || !name) {
      return res.status(400).json({ success: false, message: 'code and name are required' });
    }

    const plan = await RabRepository.findPlanById(rabPlanId);
    if (!plan) return res.status(404).json({ success: false, message: 'RAB Plan not found' });

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
    const updated = await RabRepository.updateCategory(categoryId, req.body);
    
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
    const category = await RabRepository.findCategoryById(categoryId);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

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
    const { description, volume, unit, unitPrice, ...rest } = req.body;

    if (!description || volume === undefined || !unit || unitPrice === undefined) {
      return res.status(400).json({ success: false, message: 'description, volume, unit, and unitPrice are required' });
    }

    const category = await RabRepository.findCategoryById(categoryId);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    const total = parseFloat(volume) * parseFloat(unitPrice);

    const item = await RabRepository.createItem({
      categoryId,
      rabPlanId: category.rabPlanId,
      projectId: category.projectId,
      description,
      volume,
      unit,
      unitPrice,
      total,
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
    const { volume, unitPrice, ...data } = req.body;

    const existing = await RabRepository.findItemById(itemId);
    if (!existing) return res.status(404).json({ success: false, message: 'Item not found' });

    if (volume !== undefined || unitPrice !== undefined) {
      const v = volume !== undefined ? volume : existing.volume;
      const up = unitPrice !== undefined ? unitPrice : existing.unitPrice;
      data.total = parseFloat(v) * parseFloat(up);
    }

    const updated = await RabRepository.updateItem(itemId, data);

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
    const item = await RabRepository.findItemById(itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    await RabRepository.removeItem(itemId);
    await RabRepository.syncCategorySubtotal(item.categoryId);
    await RabRepository.syncPlanTotal(item.rabPlanId);

    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
};
