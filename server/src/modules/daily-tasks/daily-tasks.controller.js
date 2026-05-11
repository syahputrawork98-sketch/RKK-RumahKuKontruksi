import * as taskService from './daily-tasks.service.js';

export const getAllTasks = async (req, res) => {
  try {
    const filters = {
      projectId: req.query.projectId,
      foremanId: req.query.foremanId,
      status: req.query.status
    };
    const tasks = await taskService.getAllTasks(filters);
    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error in getAllTasks:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data tugas harian' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Tugas tidak ditemukan' });
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil detail tugas' });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal membuat tugas harian' });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const task = await taskService.updateTaskStatus(req.params.id, status, notes);
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal update status tugas' });
  }
};
