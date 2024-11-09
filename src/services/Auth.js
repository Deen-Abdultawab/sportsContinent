import {apiClient} from "../axios";
import { catchAxiosError, catchAxiosSuccess } from "./Response"
import { encrypt, decrypt } from "./Encrypt"
import Medusa from '@medusajs/medusa-js';

const medusa_url = import.meta.env.VITE_BACKEND_BASEURL
const medusa = new Medusa({ 
    baseUrl: medusa_url, 
    maxRetries: 3 
})


export const registerCustomer = async (payload)=>{
    try {
        let res = apiClient.post(`store/customers`, payload)
        let ciphertext = encrypt(JSON.stringify(payload), import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_register_data', ciphertext);
        catchAxiosSuccess(res)
        return res
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}



export const login = async (email, password) => {
    let data = {
      email,
      password,
    }
    try {
      let res = await apiClient.post('auth/login', data, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        }
      })
      catchAxiosSuccess(res)
      return res;
    } catch (error) {
      catchAxiosError(error)
      throw error;
    }
}

export const getToken = async (email, password)=>{
    let data = {
        email,
        password,
    }
    try {
        let res = await apiClient.post(`store/auth/token`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const useToken = ()=>{
    const encryptedData = localStorage.getItem("_user_data");
    if (encryptedData) {
      const user = decrypt(encryptedData, import.meta.env.VITE_ENCRYPT_KEY);
      return user?.token || null;
    }
    return null;
}

export const logout = async ()=>{
  try {
    let res = await apiClient.post('auth/logout', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(res)
    catchAxiosSuccess(res);
  } catch (error) {
    catchAxiosError(error);
    throw error;
  }
}

// export const logout = async ()=>{
//   const token = useToken()

//   if (!token) {
//     console.warn('No token found, user might already be logged out.');
//     return;
//   }
//   try {
//     let res = await axios.post('auth/logout', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     catchAxiosSuccess(res);
//   } catch (error) {
//     catchAxiosError(error);
//     throw error;
//   }
// }

export const requestPasswordResetToken = async (payload)=>{
  try {
    let res = await medusa.customers.generatePasswordToken({
      email: payload
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

