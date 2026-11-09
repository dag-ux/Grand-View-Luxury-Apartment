import api from './axios';

export const getAllInquiries = async () => {
  const response = await api.get('/inquiries');
  return response.data;
};

export const updateInquiryStatus = async (id: string, status: string) => {
  const response = await api.put(`/inquiries/${id}/status`, { status });
  return response.data;
};