import { Actions } from "./actions";
import { rootInitialState } from "../rootReducer";
import { actionTypes } from ".";
import {
  IFetchUser,
  IForgotPasswordResponse,
  IGeneralRequestResponse,
  ILoginResponsInfo,
} from "../../types/context/auth";
/* create the user store */
export interface IUserStore {
  user: ILoginResponsInfo | null | IFetchUser;
  loading: boolean;
  forgotPassword?: IGeneralRequestResponse;
  resetPassword?: IGeneralRequestResponse;
  forgotPasswordRequestSending: boolean;
  authRequestProcessing: boolean;
  otpSent: boolean;
  imageUploading: boolean;
}

/* create default state */
const defaultState = {
  loading: false,
  user: null,
  forgotPasswordRequestSending: false,
  authRequestProcessing: false,
  otpSent: false,
  imageUploading: false,
};

/* set the initial state */
export const initialState: IUserStore = {
  loading: false,
  user: null,
  forgotPasswordRequestSending: false,
  authRequestProcessing: false,
  otpSent: false,
  imageUploading: false,
};

/**
 * initalState
 */

export interface IHydrateAction {
  payload: typeof rootInitialState;
}

export function reducer(state: IUserStore = initialState, action: Actions) {
  switch (action.type) {
    case actionTypes.FAILDER_AUTH_REQUEST:
    case actionTypes.SEND_EMAIL_VERIFICATION_OTP_SUCCESS:
    case actionTypes.VERIFY_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        authRequestProcessing: false,
      };

    case actionTypes.VERIFY_PHONE_OTP_SUCCESS_NO_AUTH:
      return {
        ...state,
        authRequestProcessing: false,
        forgotPassword: action.response,
        resetPassword: null,
        otpSent: false,
      };
    case actionTypes.VERIFY_PHONE_OTP_SUCCESS:
      return {
        ...state,
        authRequestProcessing: false,
        user: {
          ...state.user,
          ...action.response,
        },
        isOtpSent: false,
      };

    case actionTypes.SEND_PHONE_OTP:
      return {
        ...state,
        authRequestProcessing: true,
        otpSent: false,
      };
    case actionTypes.UPDATE_PASSWORD:
    case actionTypes.VERIFY_EMAIL_OTP:
    case actionTypes.UPDATE_CONTACT_INFO:
    case actionTypes.VERIFY_PHONE_OTP:
    case actionTypes.SEND_EMAIL_VERIFICATION_OTP:
      return {
        ...state,
        authRequestProcessing: true,
      };

    // case actionTypes.VERIFY_PHONE_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     authRequestProcessing: false,
    //     user: {
    //       ...state.user,
    //       ...action.response,
    //     },
    //   };
    case actionTypes.SEND_PHONE_OTP_SUCCESS:
      return {
        ...state,
        authRequestProcessing: false,
        otpSent: true,
        forgotPasswordRequestSending: false,
      };

    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        authRequestProcessing: false,
        otpSent: false,
        imageUploading: false,
      };

    case actionTypes.SEND_PHONE_OTP_FAILED:
      return {
        ...state,
        authRequestProcessing: false,
        otpSent: false,
      };

    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authRequestProcessing: false,
      };
    // case actionTypes.VERIFY_EMAIL_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     authRequestProcessing: false,
    //   };
    case actionTypes.UPLOAD_USER_PROFILE_IMAGE:
      return {
        ...state,
        imageUploading: true,
      };
    case actionTypes.UPLOAD_USER_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.response,
        },
        imageUploading: false,
      };
    case actionTypes.UPDATE_CONTACT_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.response,
        },
        authRequestProcessing: false,
      };

    case actionTypes.LOGIN_USER:
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        authRequestProcessing: true,
      };
    case actionTypes.GET_USER:
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
      };

    case actionTypes.LOGIN_USER_SUCCESS:
    case actionTypes.REGISTER_USER_SUCCESS:
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.response,
        },
        authRequestProcessing: false,
      };
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: action.response,
        forgotPasswordRequestSending: false,
        resetPassword: null,
      };
    case actionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordRequestSending: true,
        resetPassword: null,
      };

    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: action.response,
        forgotPassword: null,
        forgotPasswordRequestSending: false,
        authRequestProcessing: false,
      };

    case actionTypes.LOGOUT_USER:
      localStorage.removeItem("persist:root");
      return {
        ...defaultState,
      };
    default:
      return state;
  }
  return state;
}
