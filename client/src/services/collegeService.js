import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const getColleges = async (filters = {}) => {
  const res = await axios.get(`${API_BASE_URL}/colleges`, {
    params: filters
  });
  return res.data;
};
