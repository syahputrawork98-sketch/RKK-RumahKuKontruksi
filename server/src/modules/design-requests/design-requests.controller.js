import * as DesignRequestRepository from './design-requests.repository.js';

export const getDesignRequests = async (req, res, next) => {
  try {
    const filters = {
      customerId: req.query.customerId,
      architectId: req.query.architectId,
      status: req.query.status
    };
    const data = await DesignRequestRepository.findAll(filters);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getDesignRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DesignRequestRepository.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Design request not found' });
    }
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createDesignRequest = async (req, res, next) => {
  try {
    const { title, description, buildingType, location, estimatedBudget, customerId } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const data = await DesignRequestRepository.create({
      title,
      description,
      buildingType,
      location,
      estimatedBudget,
      customerId,
      status: 'submitted'
    });
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateDesignRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DesignRequestRepository.update(id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteDesignRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    await DesignRequestRepository.softDelete(id);
    res.json({ success: true, message: 'Design request deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const assignArchitect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { architectId } = req.body;
    
    if (!architectId) {
      return res.status(400).json({ success: false, message: 'Architect ID is required' });
    }

    const data = await DesignRequestRepository.assignArchitect(id, architectId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const convertToProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    const request = await DesignRequestRepository.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Design request not found' });
    }

    // Eligibility Checks
    if (request.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Design request must be approved before conversion' });
    }

    if (!request.customerId) {
      return res.status(400).json({ success: false, message: 'Design request must have a linked customer' });
    }

    if (request.projectId) {
      return res.status(400).json({ success: false, message: 'Design request already has an associated project' });
    }

    const projectData = {
      projectCode: `PRJ-${Date.now().toString().slice(-6)}`,
      name: request.title,
      customerId: request.customerId,
      location: request.location,
      budgetTotal: request.estimatedBudget || 0,
      adminId: adminId || null,
      type: 'Pembangunan',
      status: 'planning'
    };

    const result = await DesignRequestRepository.convertToProject(id, projectData);
    
    res.json({ 
      success: true, 
      message: 'Draft project created successfully', 
      data: result 
    });
  } catch (error) {
    next(error);
  }
};
