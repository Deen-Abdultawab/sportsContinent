import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASEURL;
axios.defaults.withCredentials = true; // Enable credentials for all axios requests

const toast = useToast();
const router = useRouter();

/*
 Axios Interceptor to log user out
*/

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      toast.error(error?.response?.data?.message, {
        timeout: 4000
      });
      localStorage.clear();
      router.push('/signin');
    }
    return Promise.reject(error);
  }
);

export default axios;
