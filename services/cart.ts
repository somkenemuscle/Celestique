import axiosInstance from '@/lib/axiosInstance';

//GET ALL PRODUCTS
export const addToCart = async (productId: string, quantity: number, size: string, color: string) => {
    const response = await axiosInstance.post('/cart/add', {
        productId,
        quantity,
        size,
        color
    });
    return response.data;
};
