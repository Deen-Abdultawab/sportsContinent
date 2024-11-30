import axios from "../axios";
import { catchAxiosError, catchAxiosSuccess } from "./Response"
import { encrypt, decrypt } from "./Encrypt"

export const getCart = async (currency)=>{
    try {
        let res = await axios.get(`cart?currency=${currency}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const addToCart = async (payload)=>{
    try {
        let res = await axios.post(`cart`, payload, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        })
        catchAxiosSuccess(res)
        return res
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const deleteCart = async ()=>{
    try {
        let res = await axios.delete(`cart`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const updateCart = async (slug, payload)=>{
    try {
        let res = await axios.put(`cart/${slug}`, payload)
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

export const deleteCartItem = async (slug)=>{
    try {
        let res = await axios.delete(`cart/item/${slug}`)
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}