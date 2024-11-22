import axiosInstance from '@/lib/axiosInstance';

//SIGN IN 
export const signIn = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/signin', {
        email, password
    });
    return response.data;
};

