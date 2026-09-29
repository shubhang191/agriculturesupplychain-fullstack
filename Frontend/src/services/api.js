import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for error handling formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred';
    if (error.response) {
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = `Server Error: ${error.response.status} ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = 'No response received from backend server. Please check if Spring Boot app is running on http://localhost:8083.';
    } else {
      errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
);

// 1. Agricultural Field API
export const agriculturalFieldApi = {
  getAll: () => api.get('/agriculturalField').then((res) => res.data),
  getById: (id) => api.get(`/agriculturalField/${id}`).then((res) => res.data),
  create: (data) => api.post('/agriculturalField', data).then((res) => res.data),
  update: (id, data) => api.put(`/agriculturalField/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/agriculturalField/${id}`).then((res) => res.data),
};

// 2. Buyer API
export const buyerApi = {
  getAll: () => api.get('/buyer').then((res) => res.data),
  getById: (id) => api.get(`/buyer/${id}`).then((res) => res.data),
  create: (data) => api.post('/buyer', data).then((res) => res.data),
  update: (id, data) => api.put(`/buyer/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/buyer/${id}`).then((res) => res.data),
};

// 3. Crop Batch API
export const cropBatchApi = {
  getAll: () => api.get('/cropBatch').then((res) => res.data),
  getByNo: (batchNo) => api.get(`/cropBatch/${batchNo}`).then((res) => res.data),
  create: (data) => api.post('/cropBatch', data).then((res) => res.data),
  update: (batchNo, data) => api.put(`/cropBatch/${batchNo}`, data).then((res) => res.data),
  delete: (batchNo) => api.delete(`/cropBatch/${batchNo}`).then((res) => res.data),
};

// 4. Farmer API
export const farmerApi = {
  getAll: () => api.get('/farmer').then((res) => res.data),
  getById: (id) => api.get(`/farmer/${id}`).then((res) => res.data),
  create: (data) => api.post('/farmer', data).then((res) => res.data),
  update: (id, data) => api.put(`/farmer/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/farmer/${id}`).then((res) => res.data),
};

// 5. Regional Coop API
export const regionalCoopApi = {
  getAll: () => api.get('/regionalCoop').then((res) => res.data),
  getById: (id) => api.get(`/regionalCoop/${id}`).then((res) => res.data),
  create: (data) => api.post('/regionalCoop', data).then((res) => res.data),
  update: (id, data) => api.put(`/regionalCoop/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/regionalCoop/${id}`).then((res) => res.data),
};

// 6. Shipment API
export const shipmentApi = {
  getAll: () => api.get('/shipment').then((res) => res.data),
  getById: (id) => api.get(`/shipment/${id}`).then((res) => res.data),
  create: (data) => api.post('/shipment', data).then((res) => res.data),
  update: (id, data) => api.put(`/shipment/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/shipment/${id}`).then((res) => res.data),
};

// 7. Storage Facility API
export const storageFacilityApi = {
  getAll: () => api.get('/storageFacility').then((res) => res.data),
  getById: (id) => api.get(`/storageFacility/${id}`).then((res) => res.data),
  create: (data) => api.post('/storageFacility', data).then((res) => res.data),
  update: (id, data) => api.put(`/storageFacility/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/storageFacility/${id}`).then((res) => res.data),
};

// 8. Supplier API
export const supplierApi = {
  getAll: () => api.get('/supplier').then((res) => res.data),
  getById: (id) => api.get(`/supplier/${id}`).then((res) => res.data),
  create: (data) => api.post('/supplier', data).then((res) => res.data),
  update: (id, data) => api.put(`/supplier/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/supplier/${id}`).then((res) => res.data),
};

export default api;
