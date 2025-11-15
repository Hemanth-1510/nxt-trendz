// API Configuration
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:4000/api'

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  USER_PROFILE: `${API_BASE_URL}/auth/me`,

  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_DETAILS: id => `${API_BASE_URL}/products/${id}`,

  // Cart endpoints
  CART: `${API_BASE_URL}/cart`,
  ADD_TO_CART: `${API_BASE_URL}/cart/add`,
  UPDATE_CART: `${API_BASE_URL}/cart/update`,
  REMOVE_FROM_CART: productId => `${API_BASE_URL}/cart/remove/${productId}`,
  CLEAR_CART: `${API_BASE_URL}/cart/clear`,

  // Order endpoints
  ORDERS: `${API_BASE_URL}/orders`,
  CREATE_ORDER: `${API_BASE_URL}/orders`,
  ORDER_DETAILS: id => `${API_BASE_URL}/orders/${id}`,

  // Health check
  HEALTH: `${API_BASE_URL}/health`,
}

export default API_ENDPOINTS

