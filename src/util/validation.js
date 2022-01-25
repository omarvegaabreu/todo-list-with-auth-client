export const minMaxLength = (text, minLength, maxLength) => {
  let result = !text || text.length < minLength;
  if (maxLength) result = result || text.length < minLength;
  return result;
};
export const validEmail = (email) => {
  const regex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  return !regex.test(email);
};

export const isAlphaNumeric = (password) => {
  const regEx = /^[0-9a-z]+$/;

  if (!password.match(regEx)) {
    return true;
  } else {
    return false;
  }
};

let registeredUsers = ["pacual@angulo.com", "me@pica.in", "el@culo.com"];

export const userExists = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (registeredUsers.findIndex((u) => u === email) !== -1) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
