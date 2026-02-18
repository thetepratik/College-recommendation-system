import axios from "axios";

const API = "http://localhost:5000/api";

export const getUserProfile = async (token) => {
  const res = await axios.get(`${API}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateUserProfile = async (data, token) => {
  const res = await axios.put(`${API}/user/profile`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get(`${API}/admin/users`);
  return res.data;
};
