import axiosInstance from '@/lib/axiosInstance';

//GET User's orders
export const getSearchedItems = async (query:string,page:string) => {
    const response = await axiosInstance.get(`/search?query=${encodeURIComponent(query)}&page=${page}`);
    return response.data;
};