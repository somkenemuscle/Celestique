import axiosInstance from '@/lib/axiosInstance';

export const getAllProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};
