import { IJob, JobStatus, TutorChosenBy } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  budget: Number,
  tip: Number,
  languages: [{ type: String }],
  title: String,
  description: String,
  course_name: String,
  coupon: { type: Schema.Types.ObjectId, ref: 'Coupons' },
  deadline_date: String,
  deadline_time: String,
  start_date: Date,
  end_date: Date,
  exam_length: Number,
  time_zone: String,
  grad_level: { type: Schema.Types.ObjectId, ref: 'Schools' },
  school_name: String,
  number_of_pages: Number,
  tutor_chosen_by: {
    type: String,
    default: TutorChosenBy.ADMIN,
    enum: Object.values(TutorChosenBy)
  },
  public_job: { type: Boolean, default: false },
  deadline: Date,
  invites: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subjects' },
  service: [{ type: Schema.Types.ObjectId, ref: 'Services' }],
  attachments: [{ type: Schema.Types.ObjectId, ref: 'Files' }],
  student: { type: Schema.Types.ObjectId, ref: 'Users' },
  status: {
    type: String,
    enum: Object.values(JobStatus),
    default: JobStatus.OPEN
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const JobModel = model<IJob>('Jobs', schema);
