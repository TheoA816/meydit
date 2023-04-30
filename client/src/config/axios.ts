import axios from "axios";

const BASE_URL = "https://meydit-fe.netlify.app/api";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  withCredentials: true,
});