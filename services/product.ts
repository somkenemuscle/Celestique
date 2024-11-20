import axiosInstance from '@/lib/axiosInstance';

export const getAllProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};


export const getProductByGenderAndCategory = async (gender: string, category: string) => {
    const response = await axiosInstance.get(`/products/${gender}/${category}`);
    return response.data;
};
