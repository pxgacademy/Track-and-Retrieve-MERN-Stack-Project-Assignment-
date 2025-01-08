import axios from "axios";
import { useEffect } from "react";
import useContextValue from "./useContextValue";

//
//

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
});

const useAPI_Link = () => {
  return instance;
};

//
//

const secureInstance = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
  withCredentials: true,
});

const useSecureAPI_Link = () => {
  const { signOutUser } = useContextValue();

  useEffect(() => {
    secureInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const status = error.status;
        if (status === 401 || status === 403) signOutUser();

        return Promise.reject(error);
      }
    );
  }, []);

  return secureInstance;
};

export { useAPI_Link, useSecureAPI_Link };
