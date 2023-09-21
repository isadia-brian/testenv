import { models, model, Schema } from "mongoose";

const HouseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  noOfGuests: {
    type: String,
    required: true,
  },
  currentBookings: [],
  months: [],
  images: [],
});

const House = models.House || model("House", HouseSchema);
export default House;
