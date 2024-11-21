import axios from 'axios';

export const initializePayment = async (email: string, amount: number) => {
  const response = await axios.post('http://localhost:4000/api/payments/initialize', { email, amount });
  return response.data;
};


export const verifyPayment = async (reference: string) => {
  const response = await axios.post('http://localhost:4000/api/payments/verify', {
    reference
  });

  // Check if the response is successful
  if (response.status === 200) return response.data;
};