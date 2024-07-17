import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

interface ErrorResponse {
  errors?: Record<string, { message: string }> | undefined | null;
  message: string;
  statusCode: number;
  success: boolean;
}

interface ResponseData<T> {
  data: T | any;
  message: string;
  statusCode: number;
  success: boolean;
}

interface ApiResponse<T> {
  responseData: ResponseData<T> | null;
  success: boolean;
  error: ErrorResponse | null;
}

const useApi = <TArgs extends any[], TResponse>(
  apiFunction: (
    ...args: TArgs
  ) => Promise<AxiosResponse<ResponseData<TResponse>>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const handler = async (...args: TArgs): Promise<ApiResponse<TResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiFunction(...args);
      const responseData = response.data;

      return {
        responseData,
        success: true,
        error: null,
      };
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const responseError = axiosError?.response?.data;
      const message =
        responseError?.errors && Object.values(responseError.errors).length
          ? Object.values(responseError.errors)[0]?.message
          : responseError?.message || "Something went wrong";

      const errorResponse = { ...responseError, message } as ErrorResponse;
      setError(() => errorResponse);

      return {
        responseData: null,
        success: false,
        error: errorResponse,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handler };
};

export default useApi;
