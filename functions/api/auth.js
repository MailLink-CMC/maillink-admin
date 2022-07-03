const axios = require('axios');

exports.login = async (id, pw) => {
  const res = await axios.post(`${Address}/api/user/auth/login/member`, {
    loginId: id,
    password: pw,
    isPC: true,
  });
  await setTokens(res.data.data);
};

exports.setTokens = async (tokens) => {
  const tokensObj = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokensObj.accessToken}`;
  setLocalstorage('tokens', JSON.stringify(tokensObj));
};
