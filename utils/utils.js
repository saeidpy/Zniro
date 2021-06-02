const isPhoneNumber = (value) => {
  var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  return regex.test(value);
};

module.exports = {
  isPhoneNumber,
};
