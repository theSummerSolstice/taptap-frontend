export const validateEmail = (emailList, email) => {

  if (emailList.length > 2) {
    return {
      result: false,
      message: 'can add email up to 3',
    };
  }

  const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!emailRegExp.test(email)) {
    return {
      result: false,
      message: 'This email is not valid',
    };
  }

  return { result: true };
};
