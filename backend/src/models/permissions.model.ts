import { IPermission, HTTPActions, Access } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  resource: [{ type: String }],
  action: { type: String, enum: Object.values(HTTPActions) },
  access: { type: String, enum: Object.values(Access) },
  ownership: { type: Boolean },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const PermissionModel = model<IPermission>('Permissions', schema);
