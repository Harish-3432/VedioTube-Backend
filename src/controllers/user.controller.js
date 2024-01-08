import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation -- fields can`t be empty
  // check if user already exist by username or email
  // check files which are required (images or avatar)
  // upload them to cloudinary , avatar
  // create a user object --create entry in db .create
  // remove password and refresh token fields
  // check for user creation response
  // if created return response else err 

  //step 1

  const {fullName, username, email, password} = req.body;
  console.log("email--", email);

  //step 2
  if (
    [fullName, username, email, password].some((field)=> field?.trim()==="")
  ) {
    throw new ApiError(400, "All Fields are required")
  }

  const existedUser = User.findOne({
    $or: [{username},{email}]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username is already exist.")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required.");
  }

   const user =  await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

});

export default registerUser;
