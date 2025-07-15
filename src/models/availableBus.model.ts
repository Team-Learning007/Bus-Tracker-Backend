import IAvailableBus from '#types/availableBus.type.js';
import {
  AVAILABLE_BUS_COLLECTION,
  AVAILABLE_BUS_NAME,
} from '#utils/constants.js';
import mongoose, { Model, Schema } from 'mongoose';

const AvailableBusSchema: Schema = new Schema(
  {
    _driver: {
      ref: 'Drivers',
      type: mongoose.Schema.Types.ObjectId,
    },
    active: {
      required: true,
      type: Boolean,
    },
    route: {
      endDestination: String,
      startDestination: String,
    },
  },
  {
    timestamps: true,
  },
);

export const AvailableBus: Model<IAvailableBus> = mongoose.model<IAvailableBus>(
  AVAILABLE_BUS_NAME,
  AvailableBusSchema,
  AVAILABLE_BUS_COLLECTION,
);
