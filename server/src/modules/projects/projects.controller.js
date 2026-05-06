import * as ProjectRepository from './projects.repository.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await ProjectRepository.findAll();
    res.json({
      success: true,
      data: projects,
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
      data: project,
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
      data: stages,
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
      data: rab,
    });
  } catch (error) {
    next(error);
  }
};
