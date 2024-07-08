import { Router } from "express";
import {
  jwtAuth,
  loginDataValidate,
  signupDataValidate,
} from "../middleware/auth.middleware";
import {
  deleteUserProfile,
  getUserProfile,
  login,
  logout,
  signup,
  updateUserProfile,
} from "../controllers/user.controller";

const router = Router();

router.route("/signup").post(signupDataValidate, signup);
router.route("/login").post(loginDataValidate, login);
router.route("/logout").get(jwtAuth, logout);
router
  .route("/")
  .get(jwtAuth, getUserProfile)
  .put(jwtAuth, updateUserProfile)
  .delete(jwtAuth, deleteUserProfile);

export default router;
