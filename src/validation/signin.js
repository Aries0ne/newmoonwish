export const validateValues = (mobile) => {
  const isValid = /^\d{12}$/.test(mobile);
  if (mobile === "") {
    return "Mobile Number is a required field";
  } else if (!isValid) {
    return "Mobile number should be 10 digits only";
  } else if (mobile === "1234567890") {
    return "Please enter a valid mobile number";
  } else {
    const firstDigit = mobile[0];
    for (let i = 1; i < 12; i++) {
      if (mobile[i] !== firstDigit) {
        return true; // Valid if any digit is different
      }
    }
    return "Please enter a valid mobile number";
  }
};

// export const validateNumber = (mobile) => {};

export const validateOtp = (otp) => {
  let isValid = {};
  if (otp === "") {
    return (isValid.otp = "Please enter valid otp");
  }
};

export const validateRegister = (fields) => {
  let isValid = {};
  if (fields === undefined) {
    isValid.firstName = "Please enter firstname";
  }
  if (!fields?.firstname) {
    isValid.firstName = "Please enter firstname";
  }

  if (!fields?.lastname) {
    isValid.lastname = "Please enter lastname";
  }
  if (!fields?.email) {
    isValid.email = "Please enter email";
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fields?.email)) {
    isValid.email = "Invalid email address";
  }
  if (!fields?.DOB) {
    isValid.DOB = "Please enter birth date";
  }
  return isValid;
};
