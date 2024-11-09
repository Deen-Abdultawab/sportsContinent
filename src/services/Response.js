import { useToast } from "vue-toastification";

const toast = useToast();
export const catchAxiosError = (error) => {
  if (error?.response?.data) {
    const responseData = error?.response?.data
// console.log(responseData)
    // Display the main error message
    if (responseData.message) {
      toast.error(responseData.message, {
        timeout: 4000
      })
    }

    // Display individual error messages
    if (responseData.errors) {
      for (const key in responseData.errors) {
        if (responseData.errors.hasOwnProperty(key)) {
          responseData.errors[key].forEach((errorMessage) => {
            toast.error(errorMessage, {
              timeout: 6000
            })
          })
        }
      }
    }
  }
}

export const catchAxiosSuccess = (res) => {

    if(res?.data?.message){
        toast.success(res.data.message, {
            timeout: 4000,
        });
    }

}