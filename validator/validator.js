//validations---------------------->>>

//Value Validation
const isEmpty = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//Name Validation
const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
};

// Email Validation
const isValidEmail = function (Email) {
  const emailRegex =
    /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
  return emailRegex.test(Email);
};

//Phone Validation
const isValidMobile = function (phone) {
  const phoneRegex =/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
  return phoneRegex.test(phone);
};

module.exports = {
  isEmpty,
  isValidName,
  isValidEmail,
  isValidMobile,
};
