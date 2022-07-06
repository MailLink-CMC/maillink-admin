import axios from 'axios';
import { setLocalstorage } from './localstorage';

export const setTokens = async (tokens) => {
  const tokensObj = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokensObj.accessToken}`;
  setLocalstorage('tokens', JSON.stringify(tokensObj));
};
