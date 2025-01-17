import axiosInstance from '@/lib/axiosInstance';

//GET ALL PRODUCTS
export const getAllProducts = async (page: number) => {
    const response = await axiosInstance.get(`/products`, {
        params: { page }
    });
    return response.data;

};


// GET ALL PRODUCTS FOR A GENDER
export const getProductByGender = async (gender: string | string[], page: number) => {
    // Normalize gender to a string
    const genderString = Array.isArray(gender) ? gender[0] : gender;

    // Make the API call with the normalized gender
    const response = await axiosInstance.get(`/products/${genderString}/all`, {
        params: { page }
    });
    return response.data;
};


// GET ALL PRODUCTS FOR GENDER AND CATEGORY
export const getProductByGenderAndCategory = async (gender: string | string[], category: string | string[], page: number) => {
    // Normalize gender and category to strings
    const genderString = Array.isArray(gender) ? gender[0] : gender;
    const categoryString = Array.isArray(category) ? category[0] : category;

    // Make the API call with normalized values
    const response = await axiosInstance.get(`/products/${genderString}/${categoryString}`, {
        params: { page }
    });
    return response.data;
};



//GET A SPECIFIC PRODUCT BY ITS SLUG
export const getProductBySlug = async (slug: string) => {
    const response = await axiosInstance.get(`/products/${slug}`);
    return response.data;
};
