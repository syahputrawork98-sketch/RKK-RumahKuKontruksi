import * as CustomerRepository from './customers.repository.js';

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await CustomerRepository.findAll();
    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await CustomerRepository.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req, res, next) => {
  try {
    const { customerType, email, name, ...rest } = req.body;

    // Validation
    if (!customerType || !email) {
      return res.status(400).json({
        success: false,
        message: 'customerType and email are required',
      });
    }

    if (typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'email must be a string',
      });
    }

    if (!['individual', 'company'].includes(customerType)) {
      return res.status(400).json({
        success: false,
        message: 'customerType must be individual or company',
      });
    }

    // Duplicate check
    const existing = await CustomerRepository.findByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
      });
    }

    const newCustomer = await CustomerRepository.create({
      customerType,
      email,
      name,
      ...rest,
    });

    res.status(201).json({
      success: true,
      data: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, ...data } = req.body;

    // Check existence
    const customer = await CustomerRepository.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Duplicate email check if email is being changed
    if (email && email !== customer.email) {
      const existing = await CustomerRepository.findByEmail(email);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use by another customer',
        });
      }
      data.email = email;
    }

    const updated = await CustomerRepository.update(id, data);

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check existence and projects
    const customer = await CustomerRepository.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    if (customer._count.projects > 0) {
      return res.status(409).json({
        success: false,
        message: 'Customer cannot be deleted because it still has projects',
      });
    }

    await CustomerRepository.remove(id);

    res.json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
