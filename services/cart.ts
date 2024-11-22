import axiosInstance from '@/lib/axiosInstance';

//ADD TO CART
export const addToCart = async (productId: string, quantity: number, size: string, color: string) => {
    const response = await axiosInstance.post('/cart/add', {
        productId,
        quantity,
        size,
        color
    });
    return response.data;
};

//GET CART
export const getCart = async () => {
    const response = await axiosInstance.get('/cart')
    return response.data;
};
