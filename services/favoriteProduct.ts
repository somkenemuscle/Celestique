import axiosInstance from '@/lib/axiosInstance';

//GET USERS SAVED PRODUCTS
export const getUsersSavedProducts = async () => {
    const response = await axiosInstance.get(`/favorite-products`);
    return response.data;
};


//SAVE PRODUCT TO FAVORITE
export const saveProductToFavorite = async (id: string) => {
    const response = await axiosInstance.post(`/favorite-products/${id}/save`);
    return response.data;
};