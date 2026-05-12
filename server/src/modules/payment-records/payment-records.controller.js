import * as paymentService from './payment-records.service.js';

export const getAllPayments = async (req, res) => {
  try {
    const filters = req.query;
    const payments = await paymentService.getAllPaymentRecords(filters);
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await paymentService.getPaymentRecordById(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    // Basic validation
    if (!paymentData.projectId || !paymentData.amount || !paymentData.type) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    const payment = await paymentService.createPaymentRecord(paymentData);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verifiedByRole, verifiedById, note } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    
    const payment = await paymentService.updatePaymentStatus(id, {
      status,
      verifiedByRole,
      verifiedById,
      note
    });
    
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
