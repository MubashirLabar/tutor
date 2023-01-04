import { put, takeEvery } from "@redux-saga/core/effects";
import { AxiosError } from "axios";
import { call } from "redux-saga/effects";
import {
  fetchUserInformation,
  forgotPassword,
  loginUser,
  resetPassword,
  sendUserEmailVerificationOTP,
  signupUser,
  updatePassword,
  updateProfilePicture,
  updateUserProfile,
  verifyUserEmailVerificationOTP,
} from "../api/users";
import { doCreateAlert } from "../stores/alert";
import {
  actionTypes,
  doChangePassowrd,
  doChangePassowrdSuccess,
  doFailedAuthRequest,
  doFetchUser,
  doFetchUserSuccess,
  doRequestForgotPassword,
  doRequestForgotPasswordSuccess,
  doLoginUser,
  doLoginUserSuccess,
  doRegisterUser,
  doSendOtp,
  doSendOtpFailed,
  doSendOtpSuccess,
  doSendEmailVerificationOTP,
  doSendEmailVerificationOTPSuccess,
  doUpdateContactInfo,
  doUpdateContactInfoSuccess,
  doUpdatePassword,
  doUpdatePasswordSuccess,
  doUpdateProfileImage,
  doUpdateProfileImageSuccess,
  doVerifyMobileOtp,
  doVerifyMobileOtpSuccess,
  doVerifyEmailOTP,
  doRequestFailed,
  doVerifyMobileOtpWithNoAuthSuccess,
} from "../stores/users";
import { InferAsyncResponse } from "../types/asyncResponse";
import { IFetchUser, ILoginResponsInfo } from "../types/context/auth";

import { noop } from "../utils/noop";
import { LocalStorage } from "../services/local-storage.service";
import {
  sendMobileAuthenticationCode,
  verifyMobileAuthenticationCode,
} from "../api/twilio";
import { fetchAgentByUserId } from "../stores/agents";

function* workLoadCreateUser(action: ReturnType<typeof doRegisterUser>) {
  try {
    if (action.redirect_uri) {
      console.log(`we received a redirect uri ${action.redirect_uri}`);
      yield call(
        LocalStorage.setRedirectURI,
        action.redirect_uri,
        action.request.email ?? action.request.phone
      );
    }
    const response: InferAsyncResponse<ReturnType<typeof signupUser>> =
      yield call(signupUser, action.request);
    if (response) {
      //if we recieved any response
      if (response?.status === "FAILURE") {
        if ("redirect_user_uri" in localStorage) {
          yield call(LocalStorage.removeRedirectInfo);
        }

        yield put(doFailedAuthRequest());
        yield put(
          doCreateAlert({
            active: true,
            message: response.message,
            type: "DANGER",
          })
        );
      } else {
        const { email, phone, password } = action.request;
        console.log(`request received is ${JSON.stringify(action.request)}`);
        if (email){
          yield put(doLoginUser({email, password}))
        } else if (phone){
          yield put(doLoginUser({phone, password}))
        } else {
          yield put(
            doCreateAlert({
              active: true,
              message: "Oops! Something went wrong. Try again",
              type: "DANGER",
            })
          );
        }
      }
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadLoginUser(action: ReturnType<typeof doLoginUser>) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof loginUser>> =
      yield call(loginUser, action.request);

    if (response) {
      if (response?.status === "FAILURE") {
        yield put(doFailedAuthRequest());
        yield put(
          doCreateAlert({
            active: true,
            message: response.message,
            type: "DANGER",
          })
        );
      } else {
        const loginResponse: ILoginResponsInfo = {
          ...response.data,
        };
        yield put(doLoginUserSuccess(loginResponse));
      }
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
}

function* workLoadFetchUser(action: ReturnType<typeof doFetchUser>) {
  try {
    console.log("inside saga");
    const response: InferAsyncResponse<
      ReturnType<typeof fetchUserInformation>
    > = yield call(fetchUserInformation, action.id);
    if (response) {
      if (response?.status === "FAILURE") {
        yield put(
          doCreateAlert({
            active: true,
            message: response.message,
            type: "DANGER",
          })
        );
      } else {
        const loginResponse: IFetchUser = {
          ...response.data,
        };
        yield put(doFetchUserSuccess(loginResponse));
      }
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadForgotPassword(
  action: ReturnType<typeof doRequestForgotPassword>
) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof forgotPassword>> =
      yield call(forgotPassword, action.value, action.source);

    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );
      if (action.source !== "phone") {
        yield put(doRequestForgotPasswordSuccess(response));
      }

      if (action.source === "phone") {
        yield put(doSendOtpSuccess(response));
      }
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadChangePassword(action: ReturnType<typeof doChangePassowrd>) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof resetPassword>> =
      yield call(resetPassword, action.request);
    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );

      yield put(doChangePassowrdSuccess(response));
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadUpdateUserProfile(
  action: ReturnType<typeof doUpdateContactInfo>
) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof updateUserProfile>> =
      yield call(updateUserProfile, action.request, action.id);
    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );

      if (response.status === "SUCCESS") {
        const info: IFetchUser = {
          ...response.data,
        };
        yield put(doUpdateContactInfoSuccess(info));
        if (action.role === "Agent") {
          if (info.agentProfile?._id) {
            yield put(fetchAgentByUserId(info.agentProfile?._id));
          }
        }
      } else {
        yield put(doRequestFailed());
      }
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadSendOtp(action: ReturnType<typeof doSendOtp>) {
  try {
    const response: InferAsyncResponse<
      ReturnType<typeof sendMobileAuthenticationCode>
    > = yield call(sendMobileAuthenticationCode, action.phone);

    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );
      yield put(
        response.status === "SUCCESS"
          ? doSendOtpSuccess(response)
          : doSendOtpFailed()
      );
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadVerifyOtpCode(action: ReturnType<typeof doVerifyMobileOtp>) {
  try {
    const response: InferAsyncResponse<
      ReturnType<typeof verifyMobileAuthenticationCode>
    > = yield call(
      verifyMobileAuthenticationCode,
      action.phone,
      action.code,
      action.authenticated
    );

    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );
      if (response.status === "SUCCESS") {
        localStorage.removeItem(`otp_phone_dispatched_information`);

        /* if request is for reset password without auth */
        if (!action.authenticated) {
          yield put(doVerifyMobileOtpWithNoAuthSuccess(response));
          return;
        }

        yield put(doFetchUser());
        const info: IFetchUser = {
          ...response.data,
        };
        yield put(doVerifyMobileOtpSuccess(info));
      } else {
        yield put(doVerifyMobileOtpSuccess());
      }
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadSendVerifyEmailOTP(
  action: ReturnType<typeof doSendEmailVerificationOTP>
) {
  try {
    const response: InferAsyncResponse<
      ReturnType<typeof sendUserEmailVerificationOTP>
    > = yield call(sendUserEmailVerificationOTP, action.email);

    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );

      yield put(doSendEmailVerificationOTPSuccess());
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadVerifyEmailOTP(action: ReturnType<typeof doVerifyEmailOTP>) {
  try {
    const response: InferAsyncResponse<
      ReturnType<typeof verifyUserEmailVerificationOTP>
    > = yield call(verifyUserEmailVerificationOTP, action.email, action.code);
    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );

      yield put(doSendEmailVerificationOTPSuccess());
      if (response.status !== "FAILURE") {
        localStorage.removeItem(`otp_email_dispatched_information`);
        yield put(doFetchUser());
      }
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadUpdatePassword(action: ReturnType<typeof doUpdatePassword>) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof updatePassword>> =
      yield call(updatePassword, action.request);

    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );
      yield put(doUpdatePasswordSuccess(response));
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadUpdateProfileImage(
  action: ReturnType<typeof doUpdateProfileImage>
) {
  try {
    const response: InferAsyncResponse<
      ReturnType<typeof updateProfilePicture>
    > = yield call(updateProfilePicture, action.request);

    if (response) {
      yield put(
        doCreateAlert({
          active: true,
          message: response.message,
          type: response.status === "FAILURE" ? "DANGER" : "SUCCESS",
        })
      );

      if (response.status === "SUCCESS") {
        const info: IFetchUser = {
          ...response.data,
        };
        yield put(doUpdateProfileImageSuccess(info));
      }
    }
  } catch (error) {
    () => noop;
  }
}
export function* watchUserSagas() {
  yield takeEvery(actionTypes.REGISTER_USER, workLoadCreateUser);
  yield takeEvery(actionTypes.LOGIN_USER, workLoadLoginUser);
  yield takeEvery(actionTypes.FORGOT_PASSWORD, workLoadForgotPassword);
  yield takeEvery(actionTypes.CHANGE_PASSWORD, workLoadChangePassword);
  yield takeEvery(actionTypes.GET_USER, workLoadFetchUser);
  yield takeEvery(actionTypes.UPDATE_CONTACT_INFO, workLoadUpdateUserProfile);
  yield takeEvery(actionTypes.SEND_PHONE_OTP, workLoadSendOtp);

  yield takeEvery(actionTypes.VERIFY_PHONE_OTP, workLoadVerifyOtpCode);
  yield takeEvery(
    actionTypes.SEND_EMAIL_VERIFICATION_OTP,
    workLoadSendVerifyEmailOTP
  );
  yield takeEvery(actionTypes.VERIFY_EMAIL_OTP, workLoadVerifyEmailOTP);
  yield takeEvery(actionTypes.UPDATE_PASSWORD, workLoadUpdatePassword);
  yield takeEvery(
    actionTypes.UPLOAD_USER_PROFILE_IMAGE,
    workLoadUpdateProfileImage
  );
}
