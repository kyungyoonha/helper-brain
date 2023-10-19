import axios from "axios";
import { BACK_URL } from "@/configs";

// const token =
//   typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''

const api = axios.create({
  baseURL: BACK_URL + "/api",
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

export default api;
