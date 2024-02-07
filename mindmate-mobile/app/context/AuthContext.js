import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/Constants";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = (username, password) => {
    setIsLoading(true);

    let data = {
      grant_type: "password",
      username: username,
      password: password,
    };

    let headers = {
      Authorization: "Basic cGFyZW50Og==",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .post(BASE_URL + "/oauth/token", data, { headers })
      .then((res) => {
        setUserToken(res.data.access_token);
        AsyncStorage.setItem("userToken", res.data.access_token);
        AsyncStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.user.userDetails)
        );
        AsyncStorage.setItem("userId", JSON.stringify(res.data.user.userId));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made, but the server responded with a status code other than 2xx
          console.error("Response Error:", error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error(error);
          console.error("Request Error:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Request Setup Error:", error.message);
        }
      });

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log("isLoggedIn in error ", e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
