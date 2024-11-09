import { apiClient } from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { useToken } from './Auth'

export const getCustomer = async () => {
    // const token = await useToken()
    try {
        let res = await apiClient.get(`auth/profile`, {
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            }
        })
        // catchAxiosSuccess(res)
        console.log(res)
        return res
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const updateCustomer = async (payload) => {
    const token = await useToken()
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