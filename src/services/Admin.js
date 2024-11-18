import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'

export const getAnalytics = async ()=>{
    try {
        let res = await axios.get('analytics')
        return res
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const createOrders = async (payload)=>{
    try {
        let res = await axios.post('orders', payload)
        return res
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getOrders = async ()=>{
    try {
        let res = await axios.get('orders')
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const initializePayment = async (payload)=>{
    try {
        let res = await axios.post('payments/initialize', payload)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getSingleOrder = async (slug)=>{
    try {
        let res = await axios.get(`orders/${slug}`)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const updateOrderStatus = async (slug, payload)=>{
    try {
        let res = await axios.put(`orders/${slug}/status`, payload)
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const createProducts = async (payload)=>{
    try {
        let res = await axios.post('products', payload)
        catchAxiosSuccess(res)
        return res
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const updateProducts = async (slug, payload)=>{
    try {
        let res = await axios.put(`products/${slug}`, payload)
        catchAxiosSuccess(res)
        return res
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getAllProducts = async (page, currency)=>{
    try {
        let res = await axios.get(`products?page=${page}&currency=${currency}`)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getSingleProduct = async (slug, currency)=>{
    try {
        let res = await axios.get(`products/${slug}?currency=${currency}`)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const deleteProduct = async (slug)=>{
    try {
        let res = await axios.delete(`products/${slug}`)
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const createCategories = async (payload)=>{
    try {
        let res = await axios.post('category', payload)
        catchAxiosSuccess(res)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const deleteCategories = async (slug)=>{
    try {
        let res = await axios.delete(`category/${slug}`)
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getCategories = async ()=>{
    try {
        let res = await axios.get('category')
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getProductsByCategories = async(slug)=>{
    try {
        let res = await axios.get(`products/category/${slug}`)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getAllCustomers = async ()=>{
    try {
        let res = await axios.get(`customers`)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getSingleCustomer = async (slug)=>{
    try {
        let res = await axios.get(`customers/${slug}`)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const getAddresses = async ()=>{
    try {
        let res = await axios.get('address')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
