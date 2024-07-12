import { axiosInstance } from "./axiosInstance";

export class UserApi {
  async signup(data: { name: string; email: string; password: string }) {
    return await axiosInstance.post("/users/signup", data);
  }

  async login(data: { email: string; password: string }) {
    return await axiosInstance.post("/users/login", data);
  }

  async logout() {
    return await axiosInstance.get("/users/logout");
  }

  async getUserProfile() {
    return await axiosInstance.get("/users");
  }

  async updateUserProfile(data: { name: string }) {
    return await axiosInstance.put("/users", data);
  }
}

export const userApi = new UserApi()