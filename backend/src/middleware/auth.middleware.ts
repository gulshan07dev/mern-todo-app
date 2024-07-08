import jwt, { JwtPayload } from "jsonwebtoken";
import emailValidator from "email-validator";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../model/user.model";
import ApiError from "../utils/apiError";

export const jwtAuth = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new ApiError(401, "User not authorized"));
  }

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
    req.userId = payload._id;
    next();
  } catch (error) {
    return next(new ApiError(401, "User not authorized"));
  }
});

export const signupDataValidate = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // check if user miss any field
  if (!(name && email && password)) {
    return next(new ApiError(400, "All fields are required!"));
  }

  // validate name
  if (name.length < 3) {
    return next(new ApiError(400, "Name must be at least 3 character!"));
  }
  if (name.length > 16) {
    return next(new ApiError(400, "Name must be less than 16 character!"));
  }

  // validate email
  if (!emailValidator.validate(email)) {
    return next(new ApiError(400, "Invalid email format!"));
  }

  // check if user has already signup with the same email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      new ApiError(400, "This email is already registered, please login")
    );
  }

  // validate password
  if (password.length < 4) {
    return next(new ApiError(400, "Password must be at least 4 character!"));
  }
  if (password.length > 8) {
    return next(new ApiError(400, "Password must be less than 8 character!"));
  }

  next();
});

export const loginDataValidate = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, "User not registered with this email!"));
  }

  // check if password is correct
  const passwordMatch = await user.isPasswordCorrect(password);
  if (!passwordMatch) {
    return next(new ApiError(400, "Incorrect password!"));
  }

  next();
});
