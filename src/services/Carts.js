import axios from "../axios";
import { catchAxiosError, catchAxiosSuccess } from "./Response"
import { encrypt, decrypt } from "./Encrypt"

export const createCart = async ()=>{
    try {
        let res = await axios.post(`store/carts`, {}, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        })
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        catchAxiosError(error)
    }
}

// export const updateCart = async (cart_id, payload) => {
//     try {
//         let res = await axios.post(`store/carts/:${cart_id}`, payload, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Accept": "application/json"
//             }
//         })
//         return res.data
//     } catch (error) {
//         console.log(error)
//     }
// }