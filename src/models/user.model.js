import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    trim: true,
    index: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    typr: String, //cloudnary URL,
    required: true,
  },
  coverImage: {
    type: String, //cloudnary URL
  },
  watchHistory: [
    {
      type: Schema.Typed.ObjectId,
      ref: "video",
    },
  ],
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  refreshToken: {
    type: String,
  },
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
