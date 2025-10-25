/* eslint-disable */
import axios from "axios";
import { getSession } from "next-auth/react";

export const api = axios.create({
  baseURL: "/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user) {
    const token = (session as any).accessToken || (session as any).jwt;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
