import type { AxiosInstance } from "axios";
import React from "react";
import { baseInstance } from "./Api";

const LoginService = (api: AxiosInstance = baseInstance) => ({
  login: async (email: string, password: string) => {
    const response = await api.post("login", {
      email,
      password,
    });
    console.log("status", response.status);

    if (response && response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
    } else {
      localStorage.setItem("accessToken", "blah");
    }

    return response;
  },
});

export default LoginService;
