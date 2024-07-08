type DataType = {
  [key: string]: any;
};

class ApiError extends Error {
  statusCode: number;
  message: string;
  errors?: any[];
  data?: DataType | null;
  success: boolean;
  stack?: string | undefined;

  constructor(
    statusCode = 500,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
