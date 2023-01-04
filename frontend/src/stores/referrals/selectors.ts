import { IReferralStore } from ".";

export interface IRootStore {
  referrals: IReferralStore;
}
export const getReferralsStore = (store: IRootStore) => store.referrals;
