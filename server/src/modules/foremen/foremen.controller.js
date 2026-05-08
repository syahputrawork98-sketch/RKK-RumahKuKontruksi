import * as ForemanRepository from './foremen.repository.js';
import prisma from '../../config/prisma.js';

export const getForemen = async (req, res, next) => {
  try {
    const foremen = await ForemanRepository.findAll();
    res.json({
      success: true,
      data: foremen,
    });
  } catch (error) {
    next(error);
  }
};

export const getForemanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foreman = await ForemanRepository.findById(id);

    if (!foreman) {
      return res.status(404).json({
        success: false,
        message: 'Foreman not found',
      });
    }

    res.json({
      success: true,
      data: foreman,
    });
  } catch (error) {
    next(error);
  }
};

export const createForeman = async (req, res, next) => {
  try {
    const { name, email, ...rest } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check duplicate email
    const existing = await prisma.foreman.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const foreman = await ForemanRepository.create({ name, email, ...rest });
    res.status(201).json({ success: true, data: foreman });
  } catch (error) {
    next(error);
  }
};

export const updateForeman = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (email) {
      const existing = await prisma.foreman.findUnique({ where: { email } });
      if (existing && existing.id !== id) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
    }

    const foreman = await ForemanRepository.update(id, req.body);
    res.json({ success: true, data: foreman });
  } catch (error) {
    next(error);
  }
};

export const deleteForeman = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if foreman has active projects
    const foreman = await ForemanRepository.findById(id);
    if (foreman?._count?.projects > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete foreman with assigned projects. Please reassign projects first.' 
      });
    }

    await ForemanRepository.softDelete(id);
    res.json({ success: true, message: 'Foreman deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

// Certificates
export const getCertificates = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificates = await ForemanRepository.findCertificatesByForemanId(id);
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

    const certificate = await ForemanRepository.createCertificate({
      foremanId: id,
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

    const certificate = await ForemanRepository.updateCertificate(certificateId, data);
    res.json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { certificateId } = req.params;
    await ForemanRepository.softDeleteCertificate(certificateId);
    res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Experiences
export const getExperiences = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experiences = await ForemanRepository.findExperiencesByForemanId(id);
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

    const experience = await ForemanRepository.createExperience({
      foremanId: id,
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
    const experience = await ForemanRepository.updateExperience(experienceId, req.body);
    res.json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    await ForemanRepository.softDeleteExperience(experienceId);
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Projects
export const getForemanProjects = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projects = await ForemanRepository.findProjectsByForemanId(id);
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getForemanStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stats = await ForemanRepository.getStats(id);
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};
