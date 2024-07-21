import { Router } from "express";
import {
  jwtAuth,
  loginDataValidate,
  signupDataValidate,
} from "../middleware/auth.middleware";
import {
  signup,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserProfile,
} from "../controllers/user.controller";

const router = Router();

router.route("/signup").post(signupDataValidate, signup);
router.route("/login").post(loginDataValidate, login);
router.route("/logout").get(jwtAuth, logout);
router
  .route("/")
  .get(jwtAuth, getUserProfile)
  .patch(jwtAuth, updateUserProfile)
  .delete(jwtAuth, deleteUserProfile);
router.route("/change-password").patch(jwtAuth, changePassword);

export default router;
