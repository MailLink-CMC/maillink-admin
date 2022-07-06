import axios from 'axios';
import { Address } from './constants';

export const searchWriter = async (name) => {
  const res = await axios.get(`${Address}/api/v1/admin/search?name=${name}`);
  return res.data.data;
};
