import axiosInstance from '@/lib/axiosInstance';

//GET ALL PRODUCTS
export const getAllProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};

// GET ALL PRODUCTS FOR A GENDER
export const getProductByGender = async (gender: string | string[]) => {
    // Normalize gender to a string
    const genderString = Array.isArray(gender) ? gender[0] : gender;

    // Make the API call with the normalized gender
    const response = await axiosInstance.get(`/products/${genderString}/all`);
    return response.data;
};

// GET ALL PRODUCTS FOR GENDER AND CATEGORY
export const getProductByGenderAndCategory = async (gender: string | string[], category: string | string[]) => {
    // Normalize gender and category to strings
    const genderString = Array.isArray(gender) ? gender[0] : gender;
    const categoryString = Array.isArray(category) ? category[0] : category;

    // Make the API call with normalized values
    const response = await axiosInstance.get(`/products/${genderString}/${categoryString}`);
    return response.data;
};

//GET A SPECIFIC PRODUCT BY ITS SLUG
export const getProductBySlug = async (slug: string) => {
    const response = await axiosInstance.get(`/products/${slug}`);
    console.log(response.data)
    return response.data;
};
