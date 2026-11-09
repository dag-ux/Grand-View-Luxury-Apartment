import api from './axios';

export const getAllApartments = async () => {
  const response = await api.get('/apartments');
  return response.data;
};

export const getApartmentById = async (id: string) => {
  const response = await api.get(`/apartments/${id}`);
  return response.data;
};

export const createApartment = async (apartmentData: any) => {
  const response = await api.post('/apartments', apartmentData);
  return response.data;
};