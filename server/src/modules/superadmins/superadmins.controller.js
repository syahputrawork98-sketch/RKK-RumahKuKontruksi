import * as SuperadminRepository from './superadmins.repository.js';

export const getSuperadmins = async (req, res, next) => {
  try {
    const superadmins = await SuperadminRepository.findAll();
    res.json({
      success: true,
      data: superadmins,
    });
  } catch (error) {
    next(error);
  }
};

export const getSuperadminById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const superadmin = await SuperadminRepository.findById(id);

    if (!superadmin) {
      return res.status(404).json({
        success: false,
        message: 'Superadmin not found',
      });
    }

    res.json({
      success: true,
      data: superadmin,
    });
  } catch (error) {
    next(error);
  }
};

export const createSuperadmin = async (req, res, next) => {
  try {
    const { name, email, phone, status } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    const existingSuperadmin = await SuperadminRepository.findByEmail(email);
    if (existingSuperadmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const superadmin = await SuperadminRepository.create({ 
      name, 
      email, 
      phone, 
      status: status || 'active' 
    });
    
    res.status(201).json({ success: true, data: superadmin });
  } catch (error) {
    next(error);
  }
};

export const updateSuperadmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (email) {
      const existingSuperadmin = await SuperadminRepository.findByEmail(email);
      if (existingSuperadmin && existingSuperadmin.id !== id) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    const superadmin = await SuperadminRepository.update(id, req.body);
    res.json({ success: true, data: superadmin });
  } catch (error) {
    next(error);
  }
};

export const deleteSuperadmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    await SuperadminRepository.softDelete(id);
    res.json({ success: true, message: 'Superadmin deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getGlobalStats = async (req, res, next) => {
  try {
    const stats = await SuperadminRepository.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
