// import mongoose, { Schema } from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       lowerCase: true,
//       trim: true,
//       index: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowerCase: true,
//       trim: true,
//       index: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true,
//     },
//     avatar: {
//       typr: String, //cloudnary URL,
//       required: true,
//     },
//     coverImage: {
//       type: String, //cloudnary URL
//     },
//     watchHistory: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "video",
//       },
//     ],
//     password: {
//       type: String,
//       required: [true, "Password is Required"],
//     },
//     refreshToken: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!isModified("password")) return next();
//   this.password = bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       username: this.username,
//       fullName: this.fullName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

// export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // corrected lowercase
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // corrected isModified
  this.password = await bcrypt.hash(this.password, 10); // await bcrypt.hash
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

