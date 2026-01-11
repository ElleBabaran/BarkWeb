import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Students API
export const studentsAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  create: (student) => api.post('/students', student),
  update: (id, student) => api.put(`/students/${id}`, student),
  delete: (id) => api.delete(`/students/${id}`),
  searchByName: (name) => api.get(`/students/search?name=${name}`),
  getByBlock: (block) => api.get(`/students/block/${block}`),
  getByYear: (year) => api.get(`/students/year/${year}`),
};

// Schedules API
export const schedulesAPI = {
  getAll: () => api.get('/schedules'),
  getById: (id) => api.get(`/schedules/${id}`),
  create: (schedule) => api.post('/schedules', schedule),
  update: (id, schedule) => api.put(`/schedules/${id}`, schedule),
  delete: (id) => api.delete(`/schedules/${id}`),
  getByBlock: (block) => api.get(`/schedules/block/${block}`),
  getByDay: (day) => api.get(`/schedules/day/${day}`),
  getByProfessor: (professor) => api.get(`/schedules/professor/${professor}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: () => api.get('/attendance'),
  getById: (id) => api.get(`/attendance/${id}`),
  create: (attendance) => api.post('/attendance', attendance),
  update: (id, attendance) => api.put(`/attendance/${id}`, attendance),
  delete: (id) => api.delete(`/attendance/${id}`),
  getByStudent: (studentId) => api.get(`/attendance/student/${studentId}`),
  getBySchedule: (scheduleId) => api.get(`/attendance/schedule/${scheduleId}`),
  getByStatus: (status) => api.get(`/attendance/status/${status}`),
};

export default api;