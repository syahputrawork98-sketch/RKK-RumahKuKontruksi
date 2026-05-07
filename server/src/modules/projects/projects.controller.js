import * as ProjectRepository from './projects.repository.js';
import * as CustomerRepository from '../customers/customers.repository.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await ProjectRepository.findAll();
    res.json({
      success: true,
      data: serializeDecimal(projects),
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await ProjectRepository.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: serializeDecimal(project),
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectStages = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const stages = await ProjectRepository.findStagesByProjectId(id);
    res.json({
      success: true,
      data: serializeDecimal(stages),
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectRab = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const rab = await ProjectRepository.findRabByProjectId(id);

    if (!rab) {
      return res.status(404).json({
        success: false,
        message: 'Active/Approved RAB plan not found for this project',
      });
    }

    res.json({
      success: true,
      data: serializeDecimal(rab),
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { projectCode, name, customerId, startDate, estimatedEndDate, ...rest } = req.body;

    // Validation
    if (!projectCode || !name || !customerId) {
      return res.status(400).json({
        success: false,
        message: 'projectCode, name, and customerId are required',
      });
    }

    // Check customer
    const customer = await CustomerRepository.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Check duplicate code
    const existing = await ProjectRepository.findByCode(projectCode);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Project code already exists',
      });
    }

    // Additional validations
    const { progress, budgetTotal, paidAmount, remainingAmount } = rest;
    if (progress !== undefined && (typeof progress !== 'number' || progress < 0 || progress > 100)) {
      return res.status(400).json({ success: false, message: 'progress must be a number between 0 and 100' });
    }
    if (budgetTotal !== undefined && (typeof budgetTotal !== 'number' || budgetTotal < 0)) {
      return res.status(400).json({ success: false, message: 'budgetTotal must be a non-negative number' });
    }
    if (paidAmount !== undefined && (typeof paidAmount !== 'number' || paidAmount < 0)) {
      return res.status(400).json({ success: false, message: 'paidAmount must be a non-negative number' });
    }
    if (remainingAmount !== undefined && (typeof remainingAmount !== 'number' || remainingAmount < 0)) {
      return res.status(400).json({ success: false, message: 'remainingAmount must be a non-negative number' });
    }

    // Date validation
    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ success: false, message: 'Invalid startDate format' });
    }
    if (estimatedEndDate && isNaN(Date.parse(estimatedEndDate))) {
      return res.status(400).json({ success: false, message: 'Invalid estimatedEndDate format' });
    }

    const newProject = await ProjectRepository.create({
      projectCode,
      name,
      customerId,
      type: rest.type || 'Pembangunan',
      status: rest.status || 'planning',
      startDate: startDate ? new Date(startDate) : null,
      estimatedEndDate: estimatedEndDate ? new Date(estimatedEndDate) : null,
      ...rest,
    });

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projectCode, customerId, startDate, estimatedEndDate, ...data } = req.body;

    // Check project existence
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check customer if changing
    if (customerId && customerId !== project.customerId) {
      const customer = await CustomerRepository.findById(customerId);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      data.customerId = customerId;
    }

    // Check duplicate code if changing
    if (projectCode && projectCode !== project.projectCode) {
      const existing = await ProjectRepository.findByCode(projectCode);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Project code already exists',
        });
      }
      data.projectCode = projectCode;
    }

    // Additional validations
    const { progress, budgetTotal, paidAmount, remainingAmount } = data;
    if (progress !== undefined && (typeof progress !== 'number' || progress < 0 || progress > 100)) {
      return res.status(400).json({ success: false, message: 'progress must be a number between 0 and 100' });
    }
    if (budgetTotal !== undefined && (typeof budgetTotal !== 'number' || budgetTotal < 0)) {
      return res.status(400).json({ success: false, message: 'budgetTotal must be a non-negative number' });
    }
    if (paidAmount !== undefined && (typeof paidAmount !== 'number' || paidAmount < 0)) {
      return res.status(400).json({ success: false, message: 'paidAmount must be a non-negative number' });
    }
    if (remainingAmount !== undefined && (typeof remainingAmount !== 'number' || remainingAmount < 0)) {
      return res.status(400).json({ success: false, message: 'remainingAmount must be a non-negative number' });
    }

    // Date validation
    if (startDate !== undefined && startDate !== null && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ success: false, message: 'Invalid startDate format' });
    }
    if (estimatedEndDate !== undefined && estimatedEndDate !== null && isNaN(Date.parse(estimatedEndDate))) {
      return res.status(400).json({ success: false, message: 'Invalid estimatedEndDate format' });
    }

    // Handle dates
    if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
    if (estimatedEndDate !== undefined) data.estimatedEndDate = estimatedEndDate ? new Date(estimatedEndDate) : null;

    const updated = await ProjectRepository.update(id, data);

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check project existence and counts
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project._count.stages > 0 || project._count.rabPlans > 0) {
      return res.status(409).json({
        success: false,
        message: 'Project cannot be deleted because it still has stages or RAB plans',
      });
    }

    await ProjectRepository.remove(id);

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
