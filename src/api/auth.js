import axios from 'axios';
import { setTokens } from '../utils/auth';

// auth 관련 api 모음
export const login = async (id, pw) => {
  const res = await axios.post(`${Address}/api/user/auth/login/member`, {
    loginId: id,
    password: pw,
    isPC: true,
  });
  await setTokens(res.data.data);
};

export const reissue = async (tokens) => {
  const res = await axios.post(`${Address}/api/user/auth/reissue`, {
    ...tokens,
    isPC: true,
  });
  await setTokens(res.data.data);
  return res.data;
};
