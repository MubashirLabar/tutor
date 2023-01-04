import { IUserStore } from ".";

export interface IRootStore {
  users: IUserStore;
}

export const authRequestInProcessing = (store: IRootStore) =>
  store.users.authRequestProcessing;
export const selectImageUploading = (store: IRootStore) =>
  store.users.imageUploading;
export const currentUserInfo = (store: IRootStore) => store.users.user;
export const isForgotPasswordRequestSent = (store: IRootStore) =>
  store.users.forgotPasswordRequestSending;
export const FetchForgotPasswordResponse = (store: IRootStore) =>
  store.users.forgotPassword;

export const FetchResetPasswordResponse = (store: IRootStore) =>
  store.users.resetPassword;
export const fetchCurrentRole = (store: IRootStore) =>
  store.users.user?.user_type;
export const fetchCurrentUserId = (store: IRootStore) => store.users.user?._id;

export const selectOtpSent = (store: IRootStore) => store.users.otpSent;

export const selectAgentProfilePicture = (store: IRootStore) =>
  store.users.user?.image_path;

export const selectAgentCoverPicture = (store: IRootStore) =>
  store.users.user?.cover_picture_path;
