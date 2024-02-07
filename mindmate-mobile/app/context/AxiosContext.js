import React, { createContext, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../constants/Constants";

const instance = axios.create(); // <-- create axios instance
instance.defaults.baseURL = BASE_URL;

export const AxiosContext = createContext(null); // <-- export axios context

const AxiosProvider = ({ children }) => {
  const { userToken, logout } = useContext(AuthContext); // <-- get state/callback

  // Use an effect to updated the auth context dependent details
  useEffect(() => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (
          typeof error.response === "undefined" ||
          [401, 419].includes(error.response.status)
        ) {
          logout();
        }
        return Promise.reject(error);
      }
    );
  }, [userToken, logout]);

  return (
    <AxiosContext.Provider value={instance}>
      {" "}
      {/* <-- context value is instance */}
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider; // <-- export the provider not the instance
