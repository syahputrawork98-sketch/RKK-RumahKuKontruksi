import apiClient from './apiClient';

const projectDocumentService = {
  getDocuments: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.projectId) params.append('projectId', filters.projectId);
    if (filters.designRequestId) params.append('designRequestId', filters.designRequestId);
    if (filters.category) params.append('category', filters.category);
    if (filters.visibility) params.append('visibility', filters.visibility);
    if (filters.uploadedByRole) params.append('uploadedByRole', filters.uploadedByRole);
    if (filters.uploadedById) params.append('uploadedById', filters.uploadedById);
    if (filters.status) params.append('status', filters.status);
    if (filters.stageId) params.append('stageId', filters.stageId);

    
    const response = await apiClient.get(`/project-documents?${params.toString()}`);
    return response.data;
  },

  getDocumentById: async (id) => {
    const response = await apiClient.get(`/project-documents/${id}`);
    return response.data;
  },

  createDocument: async (data) => {
    const response = await apiClient.post('/project-documents', data);
    return response.data;
  },
  
  uploadDocument: async (formData) => {
    const response = await apiClient.post('/project-documents/upload', formData);
    return response.data;
  },



  updateDocumentStatus: async (id, status) => {
    const response = await apiClient.patch(`/project-documents/${id}/status`, { status });
    return response.data;
  },

  updateDocumentVisibility: async (id, visibility) => {
    const response = await apiClient.patch(`/project-documents/${id}/visibility`, { visibility });
    return response.data;
  },


  deleteDocument: async (id) => {
    const response = await apiClient.delete(`/project-documents/${id}`);
    return response.data;
  }
};

export default projectDocumentService;
