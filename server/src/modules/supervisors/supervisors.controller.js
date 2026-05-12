import * as SupervisorRepository from './supervisors.repository.js';

export const getSupervisors = async (req, res, next) => {
  try {
    const supervisors = await SupervisorRepository.findAll();
    res.json({
      success: true,
      data: supervisors,
    });
  } catch (error) {
    next(error);
  }
};

export const getSupervisorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supervisor = await SupervisorRepository.findById(id);

    if (!supervisor) {
      return res.status(404).json({
        success: false,
        message: 'Supervisor not found',
      });
    }

    res.json({
      success: true,
      data: supervisor,
    });
  } catch (error) {
    next(error);
  }
};

export const createSupervisor = async (req, res, next) => {
  try {
    const { name, email, ...rest } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    const existing = await SupervisorRepository.findByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const supervisor = await SupervisorRepository.create({ name, email, ...rest });
    res.status(201).json({
      success: true,
      data: supervisor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupervisor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (email) {
      const existing = await SupervisorRepository.findByEmail(email);
      if (existing && existing.id !== id) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
    }

    const supervisor = await SupervisorRepository.update(id, req.body);
    res.json({ success: true, data: supervisor });
  } catch (error) {
    next(error);
  }
};

export const deleteSupervisor = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if supervisor has active projects
    const supervisor = await SupervisorRepository.findById(id);
    if (supervisor?._count?.projects > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete supervisor with assigned projects. Please reassign projects first.'
      });
    }

    await SupervisorRepository.softDelete(id);
    res.json({ success: true, message: 'Supervisor deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

// Certificates
export const getCertificates = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificates = await SupervisorRepository.findCertificatesBySupervisorId(id);
    res.json({ success: true, data: certificates });
  } catch (error) {
    next(error);
  }
};

export const createCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, ...rest } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const certificate = await SupervisorRepository.createCertificate({
      supervisorId: id,
      title,
      ...rest,
      issuedAt: rest.issuedAt ? new Date(rest.issuedAt) : null,
      expiredAt: rest.expiredAt ? new Date(rest.expiredAt) : null,
    });
    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const { certificateId } = req.params;
    const { issuedAt, expiredAt, ...rest } = req.body;
    const data = { ...rest };
    if (issuedAt) data.issuedAt = new Date(issuedAt);
    if (expiredAt) data.expiredAt = new Date(expiredAt);

    const certificate = await SupervisorRepository.updateCertificate(certificateId, data);
    res.json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { certificateId } = req.params;
    await SupervisorRepository.softDeleteCertificate(certificateId);
    res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Experiences
export const getExperiences = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experiences = await SupervisorRepository.findExperiencesBySupervisorId(id);
    res.json({ success: true, data: experiences });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projectName, ...rest } = req.body;
    if (!projectName) {
      return res.status(400).json({ success: false, message: 'Project Name is required' });
    }

    const experience = await SupervisorRepository.createExperience({
      supervisorId: id,
      projectName,
      ...rest
    });
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    const experience = await SupervisorRepository.updateExperience(experienceId, req.body);
    res.json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    await SupervisorRepository.softDeleteExperience(experienceId);
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getSupervisorStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stats = await SupervisorRepository.getStats(id);
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
