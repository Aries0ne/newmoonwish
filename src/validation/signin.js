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
    isValid.firstName = "Please enter firstname"; // If the field is empty
  } else if (fields.firstname.length <= 2) {
    isValid.firstName = "Firstname should be greater than 2 letters"; // If firstname is less than or equal to 2 characters
  } else if (!/^[a-zA-Z]+$/.test(fields?.firstname)) {
    isValid.firstName = "Firstname should be alphabetical"; // If it contains non-alphabetical characters
  }
  // if (!fields?.lastname) {
  //   isValid.lastname = "Please enter lastname";
  // }
  if (!fields?.lastname) {
    isValid.lastname = "Please enter lastname"; // If the field is empty
  } else if (fields.lastname.length <= 2) {
    isValid.lastname = "Lastname should be greater than 2 letters"; // If lastname is less than or equal to 2 characters
  } else if (!/^[a-zA-Z]+$/.test(fields?.lastname)) {
    isValid.lastname = "Lastname should be alphabetical"; // If it contains non-alphabetical characters
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
