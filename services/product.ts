import axiosInstance from '@/lib/axiosInstance';

export const getAllProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};


export const getProductByGender = async (gender: string) => {
    const response = await axiosInstance.get(`/products/${gender}`);
    return response.data;
};



export const getProductByGenderAndCategory = async (gender: any, category: any) => {
    const response = await axiosInstance.get(`/products/${gender}/${category}`);
    return response.data;
};
