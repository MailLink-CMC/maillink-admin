import axios from 'axios';
import { setTokens } from '../utils/auth';
import { Address } from './constants';

// auth 관련 api 모음
export const login = async (id, pw) => {
  const res = await axios.post(`${Address}/api/v1/admin/login`, {
    loginId: id,
    password: pw,
  });
  await setTokens(res.data.data.token);
};

export const reissue = async (tokens) => {
  const res = await axios.post(`${Address}/api/v1/admin/reissue`, {
    ...tokens,
  });
  await setTokens(res.data.data);
  return res.data.data;
};
