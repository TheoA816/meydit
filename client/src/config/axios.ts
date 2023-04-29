import axios from "axios";

const BASE_URL = "https://meydit-be.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  withCredentials: true,
});