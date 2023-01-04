import axiosHttp from "../services/axios.service";
import { ReferralRespose } from "../types/agents";
import {
  IUserSignUpResponse,
  ILoginRequest,
  ILoginResponse,
  IForgotPasswordResponse,
  IChangePasswordRequest,
  IGeneralRequestResponse,
  IRegistration,
  IUpdateContactInfo,
  IUpdatePassword,
} from "../types/context/auth";
import { ContactsRespose } from "../types/twilio";
import { queryUsersResponse } from "../types/users";

export const signupUser = async (user: IRegistration) => {
  const response = await axiosHttp.post<IUserSignUpResponse>(
    `/v1/api/users`,
    user
  );

  return response.data;
};

export const loginUser = async (request: ILoginRequest) => {
  const response = await axiosHttp.post<ILoginResponse>(
    `/v1/api/users/login`,
    request
  );

  return response.data;
};

export const fetchUserInformation = async (id?: string) => {
  const url = id ? `/v1/api/users/${id}` : `/v1/api/users`;
  console.log(`url : ${url}`);
  const response = await axiosHttp.get<IGeneralRequestResponse>(`${url}`);
  return response.data;
};

export const forgotPassword = async (value: string, source: string) => {
  const response = await axiosHttp.post<IGeneralRequestResponse>(
    `/v1/api/users/forgot-password`,
    {
      source,
      ...(source === "phone" && { phone: `${value}` }),
      ...(source === "email" && { email: `${value}` }),
    }
  );
  return response.data;
};

export const resetPassword = async (request: IChangePasswordRequest) => {
  const { password, id, token, source } = request;
  const response = await axiosHttp.post<IForgotPasswordResponse>(
    `/v1/api/users/reset-password`,
    {
      password,
      token,
      id,
      source,
    }
  );
  return response.data;
};

export const verifyEmail = async (id: string) => {
  const response = await axiosHttp.get<IGeneralRequestResponse>(
    `/v1/api/users/Verification/${id}`
  );
  return response.data;
};
export const verifyToken = async () => {
  try {
    const response = await axiosHttp.post<IGeneralRequestResponse>(
      `/v1/api/users/token/verify`
    );
    return response.data;
  } catch (error) {
    console.log(`error ${error}`);
  }
};

export const getReferrals = async () => {
  const response = await axiosHttp.get<ReferralRespose>(
    `/v1/api/users/referral`
  );
  return response.data;
};

export const getUsersByQuery = async (query: string) => {
  const response = await axiosHttp.get<queryUsersResponse>(
    `v1/api/users/query?queries=${query}`
  );
  return response.data;
};

export const sendUserEmailVerificationOTP = async (email: string) => {
  try {
    const response = await axiosHttp.post<IGeneralRequestResponse>(
      `/v1/api/users/email/verification-code`,
      { email }
    );
    return response.data;
  } catch (error) {
    console.log(`error : ${JSON.stringify(error)}`);
  }
};

export const verifyUserEmailVerificationOTP = async (
  email: string,
  verification_code: string
) => {
  try {
    const response = await axiosHttp.post<IGeneralRequestResponse>(
      `/v1/api/users/verify-email`,
      { email, verification_code }
    );
    return response.data;
  } catch (error) {
    console.log(`error : ${JSON.stringify(error)}`);
  }
};

export const updatePassword = async (request: IUpdatePassword) => {
  try {
    const response = await axiosHttp.post<IGeneralRequestResponse>(
      `/v1/api/users/change-password`,
      request
    );
    return response.data;
  } catch (error) {
    console.log(`error : ${JSON.stringify(error)}`);
  }
};

export const updateProfilePicture = async (request: any) => {
  try {
    const response = await axiosHttp.post<IGeneralRequestResponse>(
      `/v1/api/users/image`,
      request
    );
    return response.data;
  } catch (error) {
    console.log(`error : ${JSON.stringify(error)}`);
  }
};
// export const verifyUserEmail = async (email: string, code: string) => {
//   try {
//     const response = await axiosHttp.post<IGeneralRequestResponse>(
//       `/v1/api/users/email/verify`,
//       { email }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(`error : ${JSON.stringify(error)}`);
//   }
// };
export const updateUserProfile = async (
  request: IUpdateContactInfo,
  id: string
) => {
  try {
    const response = await axiosHttp.patch<IGeneralRequestResponse>(
      `/v1/api/users/${id}`,
      request
    );
    return response.data;
  } catch (error) {
    console.log(`response received : ${JSON.stringify(error)}`);
  }
};

export const getAvailableChatUsers = async () => {
  const response = await axiosHttp.get<ContactsRespose>(
    `/v1/api/users/valid-chat-users`
  );
  return response.data;
};
