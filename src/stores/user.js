import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { encrypt,decrypt } from "../services/Encrypt"
// import axios from "../axios";
import axios from "axios";

export const userStore = defineStore('user', ()=>{
    const user = ref(null)
    const countries = ref([])
    const states = ref([])

    const saveUser = (userData) => {
        user.value = userData
        console.log(user.value)
        let ciphertext = encrypt(JSON.stringify(user.value), import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_user_data', ciphertext)
    }

    const getUser = ()=>{
        let encryptedData = localStorage.getItem('_user_data')
        if (encryptedData) {
            user.value = decrypt(encryptedData, import.meta.env.VITE_ENCRYPT_KEY)
            return user.value
        } else {
            return null
        }
    }

    const getCountries = async()=>{
        try {
            let res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`)
            countries.value = res.data
            console.log(countries.value)
            return countries.value
        } catch (error) {
            console.log(error)
        }
    }

    const getStates = async (payload)=>{
        try {
            let res = await axios.post(`https://countriesnow.space/api/v0.1/countries/states`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                }
            })
            states.value = res.data
            console.log(res)
            return states.value
        } catch (error) {
            console.log(error)
        }
    }

    return {
        user,
        getUser,
        saveUser,
        states,
        getCountries,
        countries,
        getStates
    }
})