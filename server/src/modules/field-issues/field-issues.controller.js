import * as fieldIssueService from './field-issues.service.js';

export const getAllIssues = async (req, res) => {
  try {
    const { projectId, foremanId, status } = req.query;
    const issues = await fieldIssueService.getAllIssues({ projectId, foremanId, status });
    res.json({ data: issues });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const issue = await fieldIssueService.getIssueById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json({ data: issue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createIssue = async (req, res) => {
  try {
    const issue = await fieldIssueService.createIssue(req.body);
    res.status(201).json({ data: issue, message: 'Issue created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, actorId, resolutionNote } = req.body;
    const issue = await fieldIssueService.updateStatus(req.params.id, status, actorId, resolutionNote);
    res.json({ data: issue, message: 'Issue status updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
