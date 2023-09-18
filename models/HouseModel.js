import { models, model, Schema } from "mongoose";

const HouseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const House = models.House || model("House", HouseSchema);
export default House;
