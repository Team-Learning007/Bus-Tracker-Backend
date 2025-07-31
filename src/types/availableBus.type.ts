import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export default interface IAvailableBus extends Document {
  activeStatus: boolean;
  createdAt: Date;
  driverId: ObjectId;
  route: {
    destination: string;
    origin: string;
  };
  updatedAt: Date;
}
