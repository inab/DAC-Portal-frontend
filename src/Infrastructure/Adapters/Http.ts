import axios from 'axios';
import { Http } from '../../Domain/Ports/Http';

export const http: Http = {
    get: async <T>(url: string, params: Record<string, any>, config: Record<string, any>) => {
        const response = await axios.get(url, { ...config, params: params });
        return response.data as T;
    },
    post: async <T>(url: string, config: Record<string, any>) => {
        const response = await axios.post(url, { ...config });
        return response.data as T;
    },
    put: async <T>(url: string, params: Record<string, any>, config: Record<string, any>) => {
        const response = await axios.put(url, params, { ...config });
        return response.data as T;
    },
    delete: async <T>(url: string, params: Record<string, any>, config: Record<string, any>) => {
        const response = await axios.delete(url, { ...config, params: params });
        return response.data as T;
    }
};



