import axiosInstance from '@/lib/axiosInstance';

//GET ALL PRODUCTS
export const getAllProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};

//GET ALL PRODUCTS FOR A GENDER
export const getProductByGender = async (gender: string) => {
    const response = await axiosInstance.get(`/products/${gender}/all`);
    return response.data;
};


//GET ALL PRODUCTS FOR GENDER AND CATEGORY
export const getProductByGenderAndCategory = async (gender: string, category: string) => {
    const response = await axiosInstance.get(`/products/${gender}/${category}`);
    return response.data;
};

//GET A SPECIFIC PRODUCT BY ITS SLUG
export const getProductBySlug = async (slug: string) => {
    const response = await axiosInstance.get(`/products/${slug}`);
    console.log(response.data)
    return response.data;
};
