import apiClient from './apiClient';

const getWeeklyJournals = async (params) => {
  return apiClient.get('/weekly-journals', { params });
};

const getWeeklyJournalById = async (id, actor) => {
  return apiClient.get(`/weekly-journals/${id}`, { params: actor });
};

const createWeeklyJournal = async (payload) => {
  return apiClient.post('/weekly-journals', payload);
};

const updateWeeklyJournal = async (id, payload) => {
  return apiClient.patch(`/weekly-journals/${id}`, payload);
};

const submitWeeklyJournal = async (id, actor) => {
  return apiClient.post(`/weekly-journals/${id}/submit`, actor);
};

const reviewWeeklyJournal = async (id, payload) => {
  return apiClient.post(`/weekly-journals/${id}/review`, payload);
};

export default {
  getWeeklyJournals,
  getWeeklyJournalById,
  createWeeklyJournal,
  updateWeeklyJournal,
  submitWeeklyJournal,
  reviewWeeklyJournal,
};

