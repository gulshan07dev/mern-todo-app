import { Router } from "express";
import { jwtAuth } from "../middleware/auth.middleware";
import {
  addTodo,
  updateTodo,
  getTodos,
  toggleTodoCompletion,
  deleteTodo, 
} from "../controllers/todo.controller";

const router = Router();

router.route("/").post(jwtAuth, addTodo).get(jwtAuth, getTodos)
router.route("/:todoId").put(jwtAuth, updateTodo).delete(jwtAuth, deleteTodo)
router.route("/toggle-completed/:todoId").put(jwtAuth, toggleTodoCompletion)

export default router;
