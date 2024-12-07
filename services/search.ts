import axiosInstance from '@/lib/axiosInstance';

//GET User's orders
export const getSearchedItems = async (query:string,page:number) => {
    const response = await axiosInstance.get(`/products/search?query=${encodeURIComponent(query)}&page=${page}`);
    return response.data;
};