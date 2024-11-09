import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'

export const getAllProducts = async ()=>{
    try {
        let res = await axios.get(`products`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getSingleProducts = async (product_id)=>{
    try {
        let res = await axios.get(`store/products/${product_id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}