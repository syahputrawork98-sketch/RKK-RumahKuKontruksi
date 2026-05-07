import * as AdminRepository from './admins.repository.js';

export const getAdmins = async (req, res, next) => {
  try {
    const admins = await AdminRepository.findAll();
    res.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await AdminRepository.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, phone, status } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    const existingAdmin = await AdminRepository.findByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const admin = await AdminRepository.create({ 
      name, 
      email, 
      phone, 
      status: status || 'active' 
    });
    
    res.status(201).json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (email) {
      const existingAdmin = await AdminRepository.findByEmail(email);
      if (existingAdmin && existingAdmin.id !== id) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    const admin = await AdminRepository.update(id, req.body);
    res.json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if admin has active projects
    const activeProjectsCount = await AdminRepository.countActiveProjects(id);
    if (activeProjectsCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin with active projects. Please reassign or finish projects first.'
      });
    }

    await AdminRepository.softDelete(id);
    res.json({ success: true, message: 'Admin deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await AdminRepository.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
