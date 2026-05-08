import * as ArchitectRepository from './architects.repository.js';

export const getArchitects = async (req, res, next) => {
  try {
    const architects = await ArchitectRepository.findAll();
    res.json({
      success: true,
      data: architects,
    });
  } catch (error) {
    next(error);
  }
};

export const getArchitectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const architect = await ArchitectRepository.findById(id);

    if (!architect) {
      return res.status(404).json({
        success: false,
        message: 'Architect not found',
      });
    }

    res.json({
      success: true,
      data: architect,
    });
  } catch (error) {
    next(error);
  }
};

export const createArchitect = async (req, res, next) => {
  try {
    const { name, email, ...rest } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and Email are required' });
    }

    const architect = await ArchitectRepository.create({ name, email, ...rest });
    res.status(201).json({ success: true, data: architect });
  } catch (error) {
    next(error);
  }
};

export const updateArchitect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const architect = await ArchitectRepository.update(id, req.body);
    res.json({ success: true, data: architect });
  } catch (error) {
    next(error);
  }
};

export const deleteArchitect = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ArchitectRepository.softDelete(id);
    res.json({ success: true, message: 'Architect deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

// Certificates
export const getCertificates = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificates = await ArchitectRepository.findCertificatesByArchitectId(id);
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

    const certificate = await ArchitectRepository.createCertificate({
      architectId: id,
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

    const certificate = await ArchitectRepository.updateCertificate(certificateId, data);
    res.json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { certificateId } = req.params;
    await ArchitectRepository.softDeleteCertificate(certificateId);
    res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Experiences
export const getExperiences = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experiences = await ArchitectRepository.findExperiencesByArchitectId(id);
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

    const experience = await ArchitectRepository.createExperience({
      architectId: id,
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
    const experience = await ArchitectRepository.updateExperience(experienceId, req.body);
    res.json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    await ArchitectRepository.softDeleteExperience(experienceId);
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getArchitectStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stats = await ArchitectRepository.getStats(id);
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
