import axios from "axios";
import { BACKEND_URL } from "./contants/URLS";


const api = axios.create({
    baseURL: `${BACKEND_URL}/api/v1`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerRequest = async (formData) => await api.post('/register',formData);
export const verifyOTPRequest = async (formData) => await api.post('/verify-otp',formData);
export const loginRequest = async (formData) => await api.post('/login',formData);
export const loadUserRequest = async () => await api.get('/me');
export const getServiceChargeRequest = async () => await api.get('/service-charge');
export const getUserVendorRequest = async () => await api.get('/vendor/get-by-user/');
export const getUserMemberRequest = async () => await api.get('/vendor/get-member/');
export const getUniqueIdRequest = async () => await api.get('/vendor/get-id/');

export const addUserMemberRequest = async (formData) => await api.post('/vendor/add-member/',formData);
export const addCompanyRequest = async (formData) => await api.post('/vendor/add-company/',formData);
export const addSalesCompanyRequest = async (formData) => await api.post('/vendor/add-sales-company/',formData);
export const addUserBankRequest = async (formData) => await api.post('/vendor/add-bank/',formData);

export const getAllVendorRequest = async () => await api.get('/vendor/all');
export const getAllCompanyRequest = async () => await api.get('/vendor/get-company');
export const getAllSalesCompanyRequest = async () => await api.get('/vendor/get-sales-company');

export const getVendorDetailRequest = async (id) => await api.get(`/vendor/get/${id}`);
export const logoutRequest = async () => await api.get('/logout');
export const addVendorRequest = async (formData) => await api.post('/vendor/add',formData,{
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const updateVednorRequest = async (formData,id) => await api.put(`/vendor/update/${id}`,formData);
export const updateStateVednorRequest = async (formData,id) => await api.put(`/vendor/update-state-status/${id}`,formData);


export const updateUserRequest = async (formData) => await api.put('/user/update',formData);


export const sendEmailRequest = async (formData) => await api.post('/send-email',formData);
