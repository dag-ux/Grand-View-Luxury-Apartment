import api from './axios';

export const getAllApartments = async () => (await api.get('/apartments')).data;
export const getApartmentById = async (id: string) => (await api.get(`/apartments/${id}`)).data;

// Use FormData for file uploads
export const createApartment = async (formData: FormData) => 
  (await api.post('/apartments', formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data;

export const updateApartment = async (id: string, formData: FormData) => 
  (await api.put(`/apartments/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data;

export const deleteApartment = async (id: string) => (await api.delete(`/apartments/${id}`)).data;