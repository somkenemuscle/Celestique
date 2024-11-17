import axios from 'axios';

export const initializePayment = async (email, amount) => {
  const response = await axios.post('http://localhost:4000/api/payments/initialize', { email, amount });
  return response.data;
};


export const verifyPayment = async (reference) => {
  try {
    const response = await axios.post('http://localhost:4000/api/payments/verify', {
      reference
    });

    // Check if the response is successful
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to verify payment');
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return { success: false };
  }
};