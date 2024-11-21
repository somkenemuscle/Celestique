import axiosInstance from '@/lib/axiosInstance';

export const getAllProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};


export const getProductByGender = async (gender: any) => {
    const response = await axiosInstance.get(`/products/${gender}/all`);
    return response.data;
};



export const getProductByGenderAndCategory = async (gender: any, category: any) => {
    const response = await axiosInstance.get(`/products/${gender}/${category}`);
    return response.data;
};


export const getProductBySlug = async (slug:string) => {
    const response = await axiosInstance.get(`/products/${slug}`);
    console.log(response.data)
    return response.data;
};
