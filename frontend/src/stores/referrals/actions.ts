import { ReferralResposeData } from "../../types/agents";

export const actionTypes = {
  FETCH_REFERALS: "@@REFERRALS/FETCH_REFERALS",
  FETCH_REFERALS_SUCCESS: "@@REFERRALS/FETCH_REFERALS_SUCCESS",
  FETCH_REFERALS_ERROR: "@@REFERRALS/FETCH_REFERALS_ERROR",
  FETCH_REFERALS_LOADING: "@@REFERRALS/FETCH_REFERALS_LOADING",
} as const;

export const fetchReferrals = () => ({
  type: actionTypes.FETCH_REFERALS
});

export const fetchReferralsSuccess = ( data: Array<ReferralResposeData> ) => ({
  type: actionTypes.FETCH_REFERALS_SUCCESS,
  data
});

export const fetchReferralsError = ( ) => ({
  type: actionTypes.FETCH_REFERALS_ERROR,
  data: []
});

export const fetchReferralsLoading = ( ) => ({
  type: actionTypes.FETCH_REFERALS_LOADING
});

export type Actions =
  | ReturnType<typeof fetchReferrals>
  | ReturnType<typeof fetchReferralsSuccess>
  | ReturnType<typeof fetchReferralsError>
  | ReturnType<typeof fetchReferralsLoading>
