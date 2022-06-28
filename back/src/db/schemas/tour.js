import { Schema, model } from "mongoose";

const TourSchema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  krTitle: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  phoneNo: {
    type: String,
    index: true,
  },
  likeCount: {
    type: Number,
    default: 0,
    index: true,
  },
  likedUsers: {
    type: [String],
    default: [],
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

export const Tour = model("Tour", TourSchema);
