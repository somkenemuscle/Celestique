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

//CLEAR CART
export const clearCart = async () => {
    const response = await axiosInstance.delete('/cart/clear')
    return response.data;
};



//REMOVE FROM CART
export const removeFromCart = async (productId: string, size: string, color: string) => {
    const response = await axiosInstance.delete(`/cart/item/${productId}`, {
        params: { size, color }
    });
    return response.data;
};

//UPDATE CART QUANTITY
export const updateCartItemQuantity = async (productId: string, size: string, color: string, quantity: number) => {
    const response = await axiosInstance.put(`/cart/item/${productId}`, {}, {
        params: { size, color, quantity }
    });
    return response.data;
};



