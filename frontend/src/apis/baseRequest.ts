import axios from 'axios';
import { BaseRequest, NewExpense, RequestExpenses } from '../types';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

//baseRequest interface


const baseRequest:BaseRequest = async (url: string, method = "GET",data?: any) => {

    try{
        const response = await instance({
            method,
            url,
            data,
        });

        return [response,null];
    }
    catch(error){
        return [null,error as Error];
    }
}

export const requestCategories = async () => {
    return baseRequest('/categories');
}

export const requestExpenses:RequestExpenses = async () => {
    return baseRequest('/expenses');
}

export const requestCreateExpense:RequestExpenses<NewExpense> = async (data) => {
    return baseRequest('/expenses','POST',data);
}

export const requestDeleteExpense:RequestExpenses<number> = async (id) => {
    return baseRequest(`/expenses/${id}`,'DELETE');
}

export default instance;
