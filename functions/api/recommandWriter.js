const axios = require('axios');
const { Address } = require('./constants');

exports.submitToRecommandWriter = async (list) => {
  const res = await axios.post(`${Address}/api/v1/admin/recommend`, {
    list: list,
  });
  return res.data.data;
};
