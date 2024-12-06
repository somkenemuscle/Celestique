import axiosInstance from '@/lib/axiosInstance';

//GET User's orders
export const getUserOrders = async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
};

export const getOrderDetails = async (orderId:string) => {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
};
