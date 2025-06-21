// Configuration for API endpoints
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : 'https://intellifarm-backend-4vhv.onrender.com';

export const API_ENDPOINTS = {
  TRACK_VISIT: `${API_BASE_URL}/api/track-visit`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  SCHEMES: `${API_BASE_URL}/api/schemes`,
  CROPS: `${API_BASE_URL}/api/crops`,
  WEATHER: `${API_BASE_URL}/api/weather`,
  MARKET_PRICES: `${API_BASE_URL}/api/market-prices`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_ENDPOINTS; 