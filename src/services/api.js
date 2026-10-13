/**
 * Centralized API Client and Configuration
 * Supports switching between local dataset and a future MERN backend (Node/Express/MongoDB).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const USE_LOCAL_DATA = import.meta.env.VITE_USE_LOCAL_DATA !== 'false'; // default true for prototype

export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Standard fetch wrapper that can call future REST endpoints
 */
export async function apiClient(endpoint, options = {}) {
  // If local data is enforced or no backend URL is configured, throw a signal to use fallback
  if (USE_LOCAL_DATA || !API_BASE_URL) {
    throw new ApiError('Local dataset active - bypassing remote network call', 200, { isLocal: true });
  }

  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network error encountered', 500);
  }
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  isLocal: USE_LOCAL_DATA,
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
};
