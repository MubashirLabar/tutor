import { IFormValidation } from "../../types/alert";
import {
  ILoginRequest,
  IUserPassword,
  IRegistration,
} from "../../types/context/auth";
import { validateEmail } from "../common";
import { validationError } from "./errors";

export const validateCommonInformation = (user: IRegistration): IFormValidation => {
  console.log('LOOK')
  const {
    email,
    phone,
    password,
    full_name,
    user_name,
    user_type,
  } = user
  console.log(user)
  if (
    !(
      (user_type === "Agent" && email && password && full_name) ||
      (user_type === "Agent" && phone && password && full_name) ||
      (user_type === "Student" && email && password && full_name && user_name) ||
      (user_type === "Student" && phone && password && full_name && user_name)
    )
  ){
    return {
      error: true,
      message: validationError("all.fields.required"),
    };  
  } else {
    if (email && !validateEmail(email)){
      return {
        error: true,
        message: validationError("email.invalid"),
      };
    }
  }

  return {
    error: false,
    message: "",
  }
}

/**
 * Validate the login form
 * @param user
 * @returns
 */
export const validateLoginForm = (user: ILoginRequest): IFormValidation => {
  const { password, email, phone } = user;
  
  if ((!email && !phone) || !password) {
    return {
      error: true,
      message: validationError("all.fields.required"),
    };
  }

  return {
    error: false,
    message: "",
  };
};

/**
 * Validate the change password form
 * @param user
 * @returns
 */
export const validateChangePasswordForm = (
  user: IUserPassword
): IFormValidation => {
  const { password, cpassword } = user;
  if (!password || !cpassword) {
    return {
      error: true,
      message: validationError("all.fields.required"),
    };
  }

  if (password.toLowerCase() !== cpassword.toLowerCase()) {
    return {
      error: true,
      message: validationError("passwords.matched"),
    };
  }

  return {
    error: false,
    message: "",
  };
};
