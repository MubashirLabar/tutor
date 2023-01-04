import { IUser, UserType } from '../interfaces';
import { Schema, model } from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import env from '../config/env.config.manager';

const schema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, trim: true, index: true, unique: true, sparse: true },
  temp_mail: String,
  temp_phone: String,
  phone: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true
  },
  user_type: { type: String, enum: Object.values(UserType) },
  description: { type: String },
  location: {
    address: { type: String },
    lat: { type: String },
    lngs: { type: String },
    time_zone: { type: String },
    country: { type: String },
    street_address: { type: String },
    city: { type: String },
    postal_code: { type: String }
  },
  languages: [{ type: String }],
  password: String,
  verification_link: String,
  verification_code: String,
  image_path: String,
  agentProfile: { type: Schema.Types.ObjectId, ref: 'Agents' },
  csProfile: { type: Schema.Types.ObjectId, ref: 'CSUsers' },
  tutorProfile: { type: Schema.Types.ObjectId, ref: 'Tutors' },
  studentProfile: { type: Schema.Types.ObjectId, ref: 'Students' },
  email_verified: { type: Boolean, default: false },
  phone_verified: { type: Boolean, default: false },
  registeration_source: { type: String, enum: ['phone', 'email'] },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date },
  twilio_sid: String
});
// schema.index({
//   first_name: 'text',
//   last_name: 'text',
//   email: 'text'
// });
// schema.pre('save', function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const plaintext = this.get('password');
//   const salt = 'cdc12';
//   this.set(
//     'password',
//     crypto.pbkdf2Sync(plaintext, salt, 1000, 64, 'sha512').toString('hex')
//   );
//   next();
// });

schema.methods.setPassword = function (password) {
  const salt = env.getEnvValue('SALT');
  this.set(
    'password',
    crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  );
  return true;
};

schema.methods.validPassword = function (password) {
  const salt = env.getEnvValue('SALT');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.get('password') === hash;
};

schema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);
  console.log('this._id - ', this._id);
  console.log('this.email - ', this.get('phone'));
  return jwt.sign(
    {
      _id: this._id,
      email: this.get('email'),
      phone: this.get('phone')
    },
    env.getEnvValue('SECRET'),
    { expiresIn: 262080 }
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

export const UserModel = model<IUser>('Users', schema);
