import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import { Todo } from "../model/todo.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: false,
  maxAge: 3600 * 1000 * 24 * 10, // represent 10 days in ms
};

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // save the user
  const user = new User({
    name,
    email,
    password,
  });
  const savedUser = await user.save();
  savedUser.password = undefined;

  if (!savedUser) {
    throw new ApiError(500, "Something went wrong, try again");
  }

  // Generate Access token
  const accessToken = user.generateAccessToken();
  res.cookie("accessToken", accessToken, cookieOptions);

  return res.status(200).json(
    new ApiResponse(200, "User signup successfully", {
      user: savedUser,
      accessToken,
    })
  );
});

const login = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select("-password");

  // Generate Access token
  const accessToken = user?.generateAccessToken();

  // Set the accessToken in the cookies
  res.cookie("accessToken", accessToken, cookieOptions);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "User logged in successfully", { user, accessToken })
    );
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId).select("-password");

  // check if user exists
  if (!user) {
    throw new ApiError(404, "User not exist!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile get successfully", { user }));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;

  if (!name) {
    throw new ApiError(400, "Name is required!");
  }

  const user = await User.updateOne({ _id: userId });

  if (!user) {
    throw new ApiError(
      500,
      "Something went wrong while updating the profile, try again"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userId;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All fields are required !");
  }

  const user = await User.findById(userId);
  const isPasswordCorrect = await user?.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid oldPassword !");
  }

  user!.password = newPassword;
  await user?.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

const deleteUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const session = await User.startSession();
  try {
    session.startTransaction();

    // Delete the user
    const deletedUser = await User.deleteOne({ _id: userId }).session(session);
    if (!deletedUser.deletedCount) {
      throw new ApiError(404, "User not found");
    }

    // Delete associated todos
    await Todo.deleteMany({ user: userId }).session(session);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Clear accessToken from cookies
    res.clearCookie("accessToken", cookieOptions);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "User and associated todos deleted successfully")
      );
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    return next(error);
  }
});

export {
  signup,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserProfile,
};
