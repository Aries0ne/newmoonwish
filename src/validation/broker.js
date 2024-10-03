export const zebullValidation = (inputValue) => {
  let isValid = {};
  if (inputValue.uid === "") {
    isValid.uid = `Uid is required`;
  }
  if (inputValue.password === "") {
    isValid.password = `Password is required`;
  }
  if (inputValue.dob === "") {
    isValid.dob = `DOB is required`;
  }
  if (inputValue.appkey === "") {
    isValid.appkey = `Appkey is required`;
  }
  return isValid;
};

export const iciciValidation = (inputValue) => {
  const isValid = {};
  if (inputValue.AppKey === "") {
    isValid.AppKey = "AppKey is required!";
  }
  if (inputValue.secretkey === "") {
    isValid.secretkey = "secretkey is required!";
  }
  return isValid;
};

export const angleValidation = (inputValue) => {
  let isValid = {};
  if (inputValue.userId === "") {
    isValid.userId = "User id is required!";
  }
  if (inputValue.password === "") {
    isValid.password = "password is required!";
  }
  if (inputValue.totp === "") {
    isValid.totp = "Totp is required!";
  }
  return isValid;
};

export const zerodhaValidation = (inputValue) => {
  let isValid = {};
  if (inputValue.appkey === "") {
    isValid.appkey = "App key is required!";
  }
  if (inputValue.secretkey === "") {
    isValid.secretkey = "Secret key is required!";
  }
  if (inputValue.uid === "") {
    isValid.uid = "UID is required!";
  }
  return isValid;
};

export const kotakValidation = (inputValue) => {
  let isValid = {};
  const isValidMobile = /^\d{10}$/.test(inputValue.mobile);

  if (inputValue.userId === "") {
    isValid.userId = "User id is required!";
  }
  if (inputValue.mobile === "") {
    isValid.mobile = "mobile is required!";
  } else if (!isValidMobile) {
    isValid.mobile = "mobile number should be 10 digits only!";
  }
  // if (typeof inputValue.mobile == "string") {
  //     isValid.mobile = "mobile number should be number!"
  // }
  if (inputValue.password === "") {
    isValid.password = "password is required!";
  }
  if (inputValue.accessToken === "") {
    isValid.accessToken = "accessToken is required!";
  }
  return isValid;
};

export const aliceValidation = (inputValue) => {
  let isValid = {};
  if (inputValue.appkey === "") {
    isValid.appkey = "App Key is required!";
  }
  if (inputValue.uid === "") {
    isValid.uid = "UID is required!";
  }
  return isValid;
};

export const SharekhanValidation = (inputValue) => {
  let isValid = {};
  if (inputValue.appkey === "") {
    isValid.appkey = "App Key is required!";
  }
  if (inputValue.secretkey === "") {
    isValid.appkey = "Secret  Key is required!";
  }
  if (inputValue.uid === "") {
    isValid.uid = "UID is required!";
  }
  return isValid;
};

export const motilalValidation = (inputValue) => {
  let isValid = {};
  if (inputValue.userId === "") {
    isValid.userId = "User id is required!";
  }
  return isValid;
};
