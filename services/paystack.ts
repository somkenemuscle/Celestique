import axiosInstance from '@/lib/axiosInstance';

export const initializePayment = async (amount: number, shippingAddress: {}) => {
  const response = await axiosInstance.post('/payments/initialize', { amount, shippingAddress });
  return response.data;
};


export const verifyPayment = async (reference: string | string[], totalAmount: number) => {
  const response = await axiosInstance.post('/payments/verify', {
    reference, totalAmount
  });

  // Check if the response is successful
  if (response.status === 200) return response.data;
};