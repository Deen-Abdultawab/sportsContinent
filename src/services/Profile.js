import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'

export const getCustomer = async () => {
    try {
        let res = await axios.get(`auth/profile`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(res)
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const updateCustomer = async (payload) => {
    // const token = await useToken()
    try {
        let res = await axios.post(`store/customers/me`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        catchAxiosSuccess(res)
        return res
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}