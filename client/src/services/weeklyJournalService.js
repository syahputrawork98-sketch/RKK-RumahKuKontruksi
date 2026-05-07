import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const getWeeklyJournals = async (params) => {
  const response = await axios.get(`${API_URL}/weekly-journals`, { params });
  return response.data;
};

const getWeeklyJournalById = async (id, actor) => {
  const response = await axios.get(`${API_URL}/weekly-journals/${id}`, { params: actor });
  return response.data;
};

const createWeeklyJournal = async (payload) => {
  const response = await axios.post(`${API_URL}/weekly-journals`, payload);
  return response.data;
};

const updateWeeklyJournal = async (id, payload) => {
  const response = await axios.patch(`${API_URL}/weekly-journals/${id}`, payload);
  return response.data;
};

const submitWeeklyJournal = async (id, actor) => {
  const response = await axios.post(`${API_URL}/weekly-journals/${id}/submit`, actor);
  return response.data;
};

const reviewWeeklyJournal = async (id, payload) => {
  const response = await axios.post(`${API_URL}/weekly-journals/${id}/review`, payload);
  return response.data;
};

export default {
  getWeeklyJournals,
  getWeeklyJournalById,
  createWeeklyJournal,
  updateWeeklyJournal,
  submitWeeklyJournal,
  reviewWeeklyJournal,
};
