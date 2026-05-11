import * as reportService from './daily-reports.service.js';

export const getAllReports = async (req, res) => {
  try {
    const filters = {
      projectId: req.query.projectId,
      foremanId: req.query.foremanId,
      status: req.query.status
    };
    const reports = await reportService.getAllReports(filters);
    res.json({ success: true, data: reports });
  } catch (error) {
    console.error('Error in getAllReports:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data laporan harian' });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await reportService.getReportById(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' });
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil detail laporan' });
  }
};

export const createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error('Error in createReport:', error);
    res.status(500).json({ success: false, message: 'Gagal membuat laporan harian' });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await reportService.updateReport(req.params.id, req.body);
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal update laporan' });
  }
};

export const submitReport = async (req, res) => {
  try {
    const report = await reportService.submitReport(req.params.id);
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal submit laporan' });
  }
};

export const reviewReport = async (req, res) => {
  try {
    const { supervisorId, status, note } = req.body;
    const report = await reportService.reviewReport(req.params.id, supervisorId, status, note);
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal review laporan' });
  }
};
