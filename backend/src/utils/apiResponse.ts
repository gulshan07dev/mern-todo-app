type DataType = {
  [key: string]: any;
};

export class ApiResponse {
  statusCode: number;
  message: string;
  success: boolean
  data?: DataType;

  constructor(statusCode: number, message: string = "Success", data: DataType = {}) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400
    this.data = data;
  }
}
