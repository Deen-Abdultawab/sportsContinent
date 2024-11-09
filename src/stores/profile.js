import { ref } from 'vue'
import { defineStore } from 'pinia'
import { 
    getCustomer, 
    updateCustomer 
} from '@/services/Profile'

export const useUserProfile = defineStore('profile', ()=>{
    const customer = ref({})
    const customerDetails = ref(
        {
            "first_name": "",
            "last_name": "",
            "billing_address": {
              "first_name": "",
              "last_name": "",
              "phone": "",
              "company": "",
              "address_1": "",
              "address_2": "",
              "city": "",
              "country_code": "",
              "province": "",
              "postal_code": "",
              "metadata": {}
            },
            "password": "",
            "phone": "",
            "email": "",
            "metadata": {}
          }
    )

    const customerProfile = async () => {
        try {
            customer.value = await getCustomer()
            return customer.value
        } catch (error) {
            console.error('Error fetching user profile:', error)
        }
    }

    const updateCustomerProfile = async () => {
        let payload = {
            "first_name": customerDetails.first_name,
            "last_name": customerDetails.last_name,
            "billing_address": {
                "first_name": customerDetails.first_name,
                "last_name": customerDetails.last_name,
                "phone": customerDetails.phone,
                "company": customerDetails.company,
                "address_1": customerDetails.address_1,
                "address_2": customerDetails.address_2,
                "city": customerDetails.city,
                "country_code": customerDetails.country_code,
                "province": customerDetails.province,
                "postal_code": customerDetails.postal_code,
                "metadata":customerDetails.billing_address.metadata
            },
            "password": customerDetails.password,
            "phone": customerDetails.phone,
            "email": customerDetails.email,
            "metadata": customerDetails.metadata
        }

        try {
            let res = await updateCustomer(payload)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }


    return {
        customer,
        customerDetails,
        customerProfile,
        updateCustomerProfile
    }

})