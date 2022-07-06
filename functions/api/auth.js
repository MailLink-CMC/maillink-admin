const axios = require('axios');
const { Address } = require('./constants');

exports.login = async (id, pw) => {
  const res = await axios.post(`${Address}/api/v1/admin/login`, {
    loginId: id,
    password: pw,
  });
  await setTokens(res.data.data.token);
};

exports.setTokens = async (tokens) => {
  const tokensObj = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokensObj.accessToken}`;
};
