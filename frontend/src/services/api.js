import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('firebaseToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Questions
  getQuestions: (params) => api.get('/questions', { params }),
  createQuestion: (data) => api.post('/questions', data),
  getQuestion: (id) => api.get(`/questions/${id}`),

  // Answers
  createAnswer: (questionId, data) => api.post(`/questions/${questionId}/answers`, data),
  voteAnswer: (answerId, voteType) => api.patch(`/answers/${answerId}/vote`, { voteType }),

  // Tags
  getTags: () => api.get('/tags'),
  getTag: (name) => api.get(`/tags/${name}`),

  // Auth
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),

  // Notifications
  getNotifications: () => api.get('/notifications'),
  markAsRead: () => api.patch('/notifications/read'),
};