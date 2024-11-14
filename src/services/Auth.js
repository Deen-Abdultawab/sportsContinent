import axios from "../axios";
import { catchAxiosError, catchAxiosSuccess } from "./Response"
import { encrypt, decrypt } from "./Encrypt"


export const registerCustomer = async (payload)=>{
    try {
      let res = await axios.post(`auth/signup`, payload, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        }
      })
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
      let res = await axios.post('auth/login', data, {
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

export const logout = async ()=>{
  try {
    let res = await axios.post('auth/logout', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
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

export const requestPasswordResetToken = async ()=>{
  // try {
  //   let res = await medusa.customers.generatePasswordToken({
  //     email: payload
  //   })
  //   return res
  // } catch (error) {
  //   console.log(error)
  // }
}

