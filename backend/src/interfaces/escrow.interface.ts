export enum EscrowStatus {
  RELEASED = 'RELEASED',
  REFUNDED = 'REFUNDED',
  IN_WAIT = 'IN_WAIT'
}

export interface IEscrow {
  _id?: string;
  amount: number;
  paid_by: string;
  paid_for: string;
  requirements: string;
  status: EscrowStatus;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
