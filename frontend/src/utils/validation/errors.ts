/**
 * Validation messages :)
 * @param key
 * @returns
 */
export const validationError = (key: string) => {
  switch (key) {
    case "all.fields.required":
      return "All fields are required";
    case "email.invalid":
      return "Email Format invalid";
    case "passwords.matched":
      return "Both passwords must match";
    default:
      return "Oops! something went wrong";
  }
};
