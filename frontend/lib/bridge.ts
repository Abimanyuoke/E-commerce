import axios from "axios";
import type { AxiosError } from 'axios';
import { BASE_API_URL } from "../global";

const axiosInstance = axios.create({
    baseURL: BASE_API_URL
})


export const get = async (url: string, token: string) => {
    try {
        let headers: any = {
            "Authorization": `Bearer ${token}` || '',
        }
        let result = await axiosInstance.get(url, {
            headers
        })

        return {
            status: true,
            data: result.data
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string, code: number }>
        if (err.response) {
            console.log(err.response.data.message);
            return {
                status: false,
                message: `${err.code}: something wrong`
            }
        }
        console.log(err.response);
        return {
            status: false,
            message: `Something were wrong: ${error}`
        }
    }
}

export const post = async (url: string, data: string | FormData, token: string) => {
    try {
        const typed: string = (typeof data == 'string') ? "application/json" : "multipart/form-data"
        let headers: any = {
            "Authorization": `Bearer ${token}` || '',
            "Content-Type": typed
        }

        let result = await axiosInstance.post(url, data, {
            headers
        })

        return {
            status: true,
            data: result.data
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string, code: number }>
        if (err.response) {
            console.log(err.response.data.message);
            return {
                status: false,
                message: `${err.response.data.message}`
            }
        }
        console.log(err.response);
        return {
            status: false,
            message: `Something were wrong`
        }
    }
}

export const put = async (url: string, data: any, token: string) => {
    try {
        let isFormData = data instanceof FormData;

        let result = await axiosInstance.put(url, isFormData ? data : JSON.stringify(data), {
            headers: {
                "Authorization": `Bearer ${token}` || '',
                "Content-Type": isFormData ? "multipart/form-data" : "application/json"
            }
        });

        return {
            status: true,
            data: result.data
        };
    } catch (error) {
        const err = error as AxiosError<{ message: string; code: number }>;
        if (err.response) {
            console.log(err.response.data.message);
            return {
                status: false,
                message: `${err.code}: something wrong`
            };
        }
        console.log(err.response);
        return {
            status: false,
            message: `Something went wrong`
        };
    }
};


export const drop = async (url: string, token: string) => {
    try {
        let result = await axiosInstance.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}` || '',
            }
        })
        return {
            status: true,
            data: result.data
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string, code: number }>
        if (err.response) {
            console.log(err.response.data.message);
            return {
                status: false,
                message: `${err.code}: something wrong`
            }
        }
        console.log(err.response);
        return {
            status: false,
            message: `Something were wrong`
        }
    }
}

