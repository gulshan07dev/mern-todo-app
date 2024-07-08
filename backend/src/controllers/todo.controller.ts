import { Todo } from "../model/todo.model";
import ApiError from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const addTodo = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { content } = req.body;

  const todo = new Todo({
    userId,
    content,
  });

  const savedTodo = await todo.save();

  if (!savedTodo) {
    throw new ApiError(
      500,
      "Something went wrong while creating todo, try again"
    );
  }

  return res.status(200).json(new ApiResponse(200, "Todo created"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Content is required!");
  }

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo does not exist!");
  }

  todo.content = content;

  const updatedTodo = await todo.save();
  if (!updatedTodo) {
    throw new ApiError(
      500,
      "Something went wrong while updating the todo, try again"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo updated successfully"));
});

const getTodos = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { completed } = req.query;

  const filter: { userId?: string; completed?: boolean } = { userId };

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  const todos = await Todo.find(filter);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `${completed === undefined ? "Todos" : completed === "true" ? "Completed todos" : "Pending todos"} fetch successfully`,
        todos
      )
    );
});

const toggleTodoCompletion = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const userId = req.userId;

  const todo = await Todo.findOne({ _id: todoId, userId });
  if (!todo) {
    throw new ApiError(404, "Todo does not exist!");
  }

  todo.completed = !todo.completed;
  const updatedTodo = await todo.save();
  if (!updatedTodo) {
    throw new ApiError(
      500,
      "Something went wrong while updating the todo completion!"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, `Todo completion toggled to ${!todo.completed}`)
    );
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo does not exist!");
  }

  const deletedTodo = await Todo.deleteOne({ _id: todoId });
  if (!deletedTodo) {
    throw new ApiError(500, "Something went wrong while deleting the todo!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo deleted successfully"));
});

export { addTodo, updateTodo, getTodos, toggleTodoCompletion, deleteTodo };
