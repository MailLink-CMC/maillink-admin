const serverErrorMessage = {
  ['Not Exist Admin']: '존재하지 않는 유저입니다.',
  ['No Match Password']: '비밀번호가 틀립니다.',
};

export const translateServerErrorMessage = (message) => {
  const translated = serverErrorMessage[message];
  return translated ? translated : message;
};
