import {
  IChangePasswordRequest,
  IFetchUser,
  IForgotPasswordResponse,
  IGeneralRequestResponse,
  ILoginRequest,
  ILoginResponsInfo,
  IRegistration,
  IUpdateContactInfo,
  IUpdatePassword,
  IUserSignUpResponse,
} from "../../types/context/auth";

export const actionTypes = {
  FETCH_USERS: "@@USER/FETCH_USERS",
  FETCH_USERS_SUCCESS: "@@USER/FETCH_USERS_SUCCESS",

  UPDATE_CONTACT_INFO: "@@USER/UPDATE_CONTACT_INFO",
  UPDATE_CONTACT_INFO_SUCCESS: "@@USER/UPDATE_CONTACT_INFO_SUCCESS",
  REGISTER_USER: "@@USER/REGISTER_USER",
  REGISTER_USER_SUCCESS: "@@USER/REGISTER_USER_SUCCESS",
  LOGIN_USER: "@@USER/LOGIN_USER",
  LOGIN_USER_SUCCESS: "@@USER/LOGIN_USER_SUCCESS",
  FAILDER_AUTH_REQUEST: "@@USER/FAILDER_AUTH_REQUEST",
  GET_USER: "@@USER/GET_USER",
  GET_USER_SUCCESS: "@@USER/GET_USER_SUCCESS",
  FORGOT_PASSWORD: "@@USER/FORGOT_PASSWORD",
  FORGOT_PASSWORD_SUCCESS: "@@USER/FORGOT_PASSWORD_SUCCESS",

  SEND_PHONE_OTP: "@@USER/SEND_PHONE_OTP",
  SEND_PHONE_OTP_SUCCESS: "@@USER/SEND_PHONE_OTP_SUCCESS",
  SEND_PHONE_OTP_FAILED: "@@USER/SEND_PHONE_OTP_FAILED",
  VERIFY_PHONE_OTP: "@@USER/VERIFY_PHONE_OTP",
  VERIFY_PHONE_OTP_SUCCESS: "@@USER/VERIFY_PHONE_OTP_SUCCESS",
  VERIFY_PHONE_OTP_SUCCESS_NO_AUTH: "@@USER/VERIFY_PHONE_OTP_SUCCESS_NO_AUTH",

  VERIFY_EMAIL_OTP: "@@USER/VERIFY_EMAIL_OTP",
  VERIFY_EMAIL_OTP_SUCCESS: "@@USER/VERIFY_EMAIL_OTP_SUCCESS",

  UPLOAD_USER_PROFILE_IMAGE: "@@USER/UPLOAD_USER_PROFILE_IMAGE",
  UPLOAD_USER_PROFILE_IMAGE_SUCCESS: "@@USER/UPLOAD_USER_PROFILE_IMAGE_SUCCESS",

  SEND_EMAIL_VERIFICATION_OTP: "@@USER/SEND_EMAIL_VERIFICATION_OTP",
  SEND_EMAIL_VERIFICATION_OTP_SUCCESS:
    "@@USER/SEND_EMAIL_VERIFICATION_OTP_SUCCESS",

  CHANGE_PASSWORD: "@@USER/CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS: "@@USER/CHANGE_PASSWORD_SUCCESS",

  UPDATE_PASSWORD: "@@USER/UPDATE_PASSWORD",
  UPDATE_PASSWORD_SUCCESS: "@@USER/UPDATE_PASSWORD_SUCCESS",

  REQUEST_FAILED: "@@USER/REQUEST_FAILED",

  LOGOUT_USER: "@@USER/LOGOUT_USER",
} as const;

export const doRegisterUser = (
  request: IRegistration,
  redirect_uri?: string
) => ({
  type: actionTypes.REGISTER_USER,
  request,
  redirect_uri,
});
export const doFailedAuthRequest = () => ({
  type: actionTypes.FAILDER_AUTH_REQUEST,
});
export const doRegisterUserSuccess = (response: IUserSignUpResponse) => ({
  type: actionTypes.REGISTER_USER_SUCCESS,
  response,
});
export const doLoginUser = (request: ILoginRequest) => ({
  type: actionTypes.LOGIN_USER,
  request,
});

export const doLoginUserSuccess = (response: ILoginResponsInfo) => ({
  type: actionTypes.LOGIN_USER_SUCCESS,
  response,
});

export const doUpdateContactInfo = (
  request: any,
  id: string,
  role: string
) => ({
  type: actionTypes.UPDATE_CONTACT_INFO,
  request,
  id,
  role,
});

export const doUpdateContactInfoSuccess = (response: IFetchUser) => ({
  type: actionTypes.UPDATE_CONTACT_INFO_SUCCESS,
  response,
});

export const doRequestFailed = () => ({
  type: actionTypes.REQUEST_FAILED,
});
export const doFetchUser = (id?: string) => ({
  type: actionTypes.GET_USER,
  id,
});
export const doFetchUserSuccess = (response: IFetchUser) => ({
  type: actionTypes.GET_USER_SUCCESS,
  response,
});

export const doRequestForgotPassword = (value: string, source: string) => ({
  type: actionTypes.FORGOT_PASSWORD,
  value,
  source,
});
export const doRequestForgotPasswordSuccess = (
  response: IForgotPasswordResponse
) => ({
  type: actionTypes.FORGOT_PASSWORD_SUCCESS,
  response,
});
export const doChangePassowrd = (request: IChangePasswordRequest) => ({
  type: actionTypes.CHANGE_PASSWORD,
  request,
});

export const doSendOtp = (phone: string) => ({
  type: actionTypes.SEND_PHONE_OTP,
  phone,
});
export const doSendOtpSuccess = (response: IGeneralRequestResponse) => ({
  type: actionTypes.SEND_PHONE_OTP_SUCCESS,
  response,
});

export const doSendOtpFailed = () => ({
  type: actionTypes.SEND_PHONE_OTP_FAILED,
});

export const doVerifyMobileOtp = (
  phone: string,
  code: string,
  authenticated: boolean = true
) => ({
  type: actionTypes.VERIFY_PHONE_OTP,
  phone,
  code,
  authenticated,
});

export const doVerifyMobileOtpSuccess = (response?: IFetchUser) => ({
  type: actionTypes.VERIFY_PHONE_OTP_SUCCESS,
  response,
});

export const doVerifyMobileOtpWithNoAuthSuccess = (
  response: IGeneralRequestResponse
) => ({
  type: actionTypes.VERIFY_PHONE_OTP_SUCCESS_NO_AUTH,
  response,
});
export const doSendEmailVerificationOTP = (email: string) => ({
  type: actionTypes.SEND_EMAIL_VERIFICATION_OTP,
  email,
});

export const doSendEmailVerificationOTPSuccess = () => ({
  type: actionTypes.SEND_EMAIL_VERIFICATION_OTP_SUCCESS,
});

export const doVerifyEmailOTP = (email: string, code: string) => ({
  type: actionTypes.VERIFY_EMAIL_OTP,
  email,
  code,
});

export const doVerifyEmailOTPSuccess = (response: IFetchUser) => ({
  type: actionTypes.VERIFY_EMAIL_OTP_SUCCESS,
  response,
});

export const doUpdatePassword = (request: IUpdatePassword) => ({
  type: actionTypes.UPDATE_PASSWORD,
  request,
});

export const doUpdatePasswordSuccess = (response: IGeneralRequestResponse) => ({
  type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  response,
});

export const doUpdateProfileImage = (
  request: any,
  is_cover: boolean = false
) => ({
  type: actionTypes.UPLOAD_USER_PROFILE_IMAGE,
  request,
});

export const doUpdateProfileImageSuccess = (response: IFetchUser) => ({
  type: actionTypes.UPLOAD_USER_PROFILE_IMAGE_SUCCESS,
  response,
});

export const doChangePassowrdSuccess = (response: IForgotPasswordResponse) => ({
  type: actionTypes.CHANGE_PASSWORD_SUCCESS,
  response,
});
export const doLogoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
});

export type Actions =
  | ReturnType<typeof doRegisterUser>
  | ReturnType<typeof doRegisterUserSuccess>
  | ReturnType<typeof doLoginUser>
  | ReturnType<typeof doLoginUserSuccess>
  | ReturnType<typeof doFetchUser>
  | ReturnType<typeof doFetchUserSuccess>
  | ReturnType<typeof doRequestForgotPassword>
  | ReturnType<typeof doRequestForgotPasswordSuccess>
  | ReturnType<typeof doChangePassowrd>
  | ReturnType<typeof doChangePassowrdSuccess>
  | ReturnType<typeof doFailedAuthRequest>
  | ReturnType<typeof doSendOtp>
  | ReturnType<typeof doSendOtpSuccess>
  | ReturnType<typeof doSendOtpFailed>
  | ReturnType<typeof doUpdateContactInfo>
  | ReturnType<typeof doUpdateContactInfoSuccess>
  | ReturnType<typeof doVerifyMobileOtp>
  | ReturnType<typeof doVerifyMobileOtpSuccess>
  | ReturnType<typeof doVerifyMobileOtpWithNoAuthSuccess>
  | ReturnType<typeof doSendEmailVerificationOTP>
  | ReturnType<typeof doSendEmailVerificationOTPSuccess>
  | ReturnType<typeof doVerifyEmailOTP>
  | ReturnType<typeof doVerifyEmailOTPSuccess>
  | ReturnType<typeof doUpdatePassword>
  | ReturnType<typeof doUpdatePasswordSuccess>
  | ReturnType<typeof doUpdateProfileImage>
  | ReturnType<typeof doUpdateProfileImageSuccess>
  | ReturnType<typeof doRequestFailed>
  | ReturnType<typeof doLogoutUser>;
