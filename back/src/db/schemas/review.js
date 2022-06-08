import pkg from 'mongoose';
const { Schema ,model } = pkg;

const ReviewSchema = new Schema({
  landmarkId: {
    type: String,
    required: true,
    index: true,
  },
  writerId: {
    type: String,
    required: true,
    index: true,
  },
  writerNickName: {
    type: String,
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
    index: true,
  },
  saveFileName: {
    type: String,
  },
  saveFilePath: {
    type: String,
  }
})

export const Review = model("Review", ReviewSchema)