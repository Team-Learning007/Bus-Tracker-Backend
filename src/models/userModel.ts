import { Schema } from 'inspector/promises';
import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

interface IUser {
  _id: Types.ObjectId;
  bio: string;
  createdAt?: Date;
  email: string;
  fullname: string;
  password: string;
  profilePhoto: string;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    bio: {
      type: String,
    },
    email: {
      required: true,
      trim: true, // remove white spaces
      type: String,
      unique: true,
    },
    fullname: {
      required: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      select: false, //while fetching data of any user if it is false, it don't show password with other details
      trim: true,
      type: String,
    },
    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
export default mongoose.model<IUser>('User', UserSchema);
