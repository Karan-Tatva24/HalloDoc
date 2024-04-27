import axios from "axios";
import { AppRoutes } from "../constants/routes";
import { toast } from "react-toastify";
// import { clearCookie, getValueFromCookie } from "@/src/utility/cookie";
// import { TOKEN_KEY, DEFAULT_CONTENT_TYPE } from "@/src/constants/common";
// import { HOMEPAGE_URL } from "../constants/urls";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

Axios.interceptors.request.use((config) => {
  const useToken = config?.withAuthToken ?? true;
  const token = localStorage.getItem("private_token");
  const headers = config.headers;
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: useToken && token && `Bearer ${token}`,
    },
  };
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data?.errorMessage === "jwt expired") {
      localStorage.clear();
      window.location = AppRoutes.LOGIN;
    } else if (error?.response?.data?.status === 404) {
      window.location = AppRoutes.INVOICING;
      toast.error(error?.response?.data?.message);
    }
    return Promise.reject(error);
  },
);

export default Axios;
