import { reissue } from '../api/auth';
import { getLocalstorage, setLocalstorage } from './localstorage';

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
