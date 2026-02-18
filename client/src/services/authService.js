import axios from "axios";

const API = "http://localhost:5000/api";

export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};
