export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';


/**
 * Generic API client for RKK data service
 */
const apiClient = {
  async request(endpoint, options = {}) {
    let url = `${API_BASE_URL}${endpoint}`;
    
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }
    
    const isFormData = options.body instanceof FormData;
    
    const defaultHeaders = isFormData ? {} : { 'Content-Type': 'application/json' };

    const defaultOptions = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    if (options.body && !isFormData && typeof options.body === 'object') {
      defaultOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error(`API Request Error [${endpoint}]:`, error);
      throw error;
    }
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: body,
    });
  },

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: body,
    });
  },


  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },
};

export default apiClient;
