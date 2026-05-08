import * as ProjectStageRepository from './project-stages.repository.js';
import * as ProjectRepository from '../projects/projects.repository.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';

export const getStagesByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const stages = await ProjectStageRepository.findAllByProjectId(projectId);
    res.json({
      success: true,
      data: serializeDecimal(stages),
    });
  } catch (error) {
    next(error);
  }
};

export const getStageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stage = await ProjectStageRepository.findById(id);
    if (!stage) {
      return res.status(404).json({
        success: false,
        message: 'Stage not found',
      });
    }
    res.json({
      success: true,
      data: serializeDecimal(stage),
    });
  } catch (error) {
    next(error);
  }
};

export const createStage = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { code, title, status, ...rest } = req.body;

    if (!code || !title || !status) {
      return res.status(400).json({
        success: false,
        message: 'code, title, and status are required',
      });
    }

    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const stage = await ProjectStageRepository.create({
      projectId,
      code,
      title,
      status,
      ...rest,
    });

    res.status(201).json({
      success: true,
      data: serializeDecimal(stage),
    });
  } catch (error) {
    next(error);
  }
};

export const updateStage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isVerified, verifiedBy, verifiedAt, ...data } = req.body;

    const existing = await ProjectStageRepository.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Stage not found',
      });
    }

    // Admin cannot change verification fields in Phase 2
    const updated = await ProjectStageRepository.update(id, data);

    res.json({
      success: true,
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await ProjectStageRepository.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Stage not found',
      });
    }

    if (existing.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a verified stage',
      });
    }

    await ProjectStageRepository.remove(id);
    res.json({
      success: true,
      message: 'Stage deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
