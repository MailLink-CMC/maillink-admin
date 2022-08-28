import axios from 'axios';
import { Address } from './constants';

export const getRegisterList = async () => {
  const res = await axios.get(`${Address}/api/v1/admin/registration`);
  return res.data.data;
};

export const getRegisterPost = async (id) => {
  const res = await axios.get(`${Address}/api/v1/admin/registration/post/${id}`);
  return res.data.data;
};

export const postRegisterResult = async (id, result) => {
  const res = await axios.post(`${Address}/api/v1/admin/registration/${id}?result=${result}`);
  return res.data.data;
};
