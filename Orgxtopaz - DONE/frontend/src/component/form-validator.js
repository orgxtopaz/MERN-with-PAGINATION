export const checkValidation = (isClicked, inputValues, validation) => {
    if (!isClicked) return;
    let errors = { ...validation };

    //first Name validation
    if (!inputValues.firstName.trim()) {
      errors.firstName = "First name is required";
    } else {
      errors.firstName = "";
    }
    //last Name validation
    if (!inputValues.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else {
      errors.lastName = "";
    }

    // email validation
    const emailCond = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = "Email is not valid";
    } else {
      errors.email = "";
    }

    //password validation
    const password = inputValues.password;
    if (!password) {
      errors.password = "password is required";
    } else if (password.length < 6) {
      errors.password = "longer than 6 char.";
    } else if (password.length >= 20) {
      errors.password = "shorter than 20 char.";
    } else {
      errors.password = "";
    }

    //matchPassword validation
    if (!inputValues.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
    } else if (inputValues.confirmPassword !== inputValues.Password) {
      errors.confirmPassword = "Password does not match confirmation password";
    } else {
      errors.password = "";
    }

    //setValidation(errors);
    return errors;

  };