import axios from 'axios';
import { reissue } from '../api/auth';
import { getLocalstorage, removeLocalstorage, setLocalstorage } from './localstorage';

export const authInit = async () => {
  const tokensJson = getLocalstorage('tokens');

  if (tokensJson !== null) {
    //reissue
    try {
      await reissue(tokensJson);
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const setTokens = async (tokens) => {
  const tokensObj = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokensObj.accessToken}`;
  setLocalstorage('tokens', JSON.stringify(tokensObj));
};

export const logout = () => {
  removeLocalstorage('tokens');
  axios.defaults.headers.common['Authorization'] = null;
};
