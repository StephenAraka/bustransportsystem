const isValidUsername = (username) => {
  const nameRegEx = /[^A-Za-z0-9]+/g;
  return !nameRegEx.test(String(username).toLowerCase());
}

const isValidEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegEx.test(String(email).toLowerCase());
}

const trimmed = (string) => string.trim();

export { isValidUsername, isValidEmail, trimmed };

