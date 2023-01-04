import { ITwilioStore } from "../../types/twilio";
export interface IRootStore {
  twilio: ITwilioStore;
}
export const getTwilioStore = (store: IRootStore) => store.twilio;




