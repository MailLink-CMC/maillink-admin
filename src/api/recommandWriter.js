import axios from 'axios';
import { Address } from './constants';

export const submitToRecommandWriter = async (list) => {
  const res = await axios.post(`${Address}/api/v1/admin/recommend`, {
    list: list,
  });
  return res.data.data;
};
