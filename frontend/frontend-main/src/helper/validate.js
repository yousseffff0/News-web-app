import toast from "react-hot-toast";
import { authenitcate } from "./helper.js";

// validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerfiy({}, values);

  if (values.username) {
    const { status } = await authenitcate(values.username);

    if (status !== 200) {
      errors.exit = toast.error("User does not exist");
    }
  }
  return errors;
}

// User name page
function usernameVerfiy(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required");
    throw new Error("Username is required");

  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username.. ");
    throw new Error("Username is empty");

  }
  return error;
}

// register page password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"|,.<>/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required");
    throw new Error("Password is Required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password ");
    throw new Error("Password is empty");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long"
    );
    throw new Error("Password too small");

  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have a special character");
    throw new Error("Password too weak");

  }

  return errors;
}
// regitser page email

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required");
    throw new Error("Email is Required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email");
    throw new Error("Email is Empty");
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    error.email = toast.error("Invalid email address...!");
    throw new Error("Email in wrong format");

  }
  return error;
}

export async function validateRegister(values) {
  const errors = usernameVerfiy({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
}

export async function profileValidate(values) {
  const errors = emailVerify({}, values);
  return errors;
}