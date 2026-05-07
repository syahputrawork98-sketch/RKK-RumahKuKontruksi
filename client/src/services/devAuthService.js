import apiClient from './apiClient';

/**
 * Service to handle Dev Sign-In & Persona fetching
 */
const devAuthService = {
  /**
   * Get list of personas by role
   * @param {string} role 
   * @returns {Promise<Array>}
   */
  async getPersonasByRole(role) {
    const endpointMap = {
      admin: '/admins',
      superadmin: '/superadmins',
      pengawas: '/supervisors',
      mandor: '/foremen',
      arsitek: '/architects',
      konsumen: '/customers',
    };

    const endpoint = endpointMap[role];
    if (!endpoint) {
      throw new Error(`Unknown role: ${role}`);
    }

    try {
      const response = await apiClient.get(endpoint);
      
      // Data is usually in response.data or response directly depending on apiClient interceptor
      // Standardizing the response to Array of normalized objects
      const data = response.data || response;
      
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map(item => ({
        id: item.id,
        name: item.name || item.fullName || item.nama || item.companyName || item.email || `User ${item.id}`,
        email: item.email || '',
        raw: item
      }));
    } catch (error) {
      console.error(`Error fetching personas for role ${role}:`, error);
      throw error;
    }
  }
};

export default devAuthService;
