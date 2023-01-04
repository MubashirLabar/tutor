export interface IPaymentMethods {
  _id?: string;
  name: string;
  credentials: string;
  type: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
