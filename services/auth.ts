import axiosInstance from '@/lib/axiosInstance';

//SIGN IN 
export const signIn = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/signin', {
        email, password
    });
    return response.data;
};

//SIGN UP 
export const signUp = async (firstname: string, lastname: string, phoneNumber: string, email: string, password: string, recaptchaToken: string) => {
    const response = await axiosInstance.post('/auth/signup', {
        email, password, firstname, lastname, phoneNumber, recaptchaToken
    });
    return response.data;
};

