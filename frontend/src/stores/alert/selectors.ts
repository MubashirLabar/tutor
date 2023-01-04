import { IAlertStore } from './reducer';

export interface IRootStore {
	alert: IAlertStore;
}

export const currentAlertState = (store: IRootStore) => store.alert.alert;
