import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export default interface IAvailableBus extends Document {
  _driver: ObjectId;
  active: boolean;
  createdAt: Date;
  route: {
    endDestination: string;
    startDestination: string;
  };
  updatedAt: Date;
}
