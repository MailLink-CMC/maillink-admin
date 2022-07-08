// api 주소 등
export const Address =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://3.39.69.7:8080'
    : 'https://maillink-api.com';
