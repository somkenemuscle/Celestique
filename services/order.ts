import axiosInstance from '@/lib/axiosInstance';

//GET User's orders
export const getUserOrders = async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
};