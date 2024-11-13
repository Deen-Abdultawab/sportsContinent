import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'

export const getAnalytics = async ()=>{
    try {
        let res = await axios.get('analytics' , {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
}