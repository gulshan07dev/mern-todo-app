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
    return await axiosInstance.patch("/users", data);
  }

  async changePassword(data: { oldPassword: string, newPassword: string }) {
    return await axiosInstance.patch("/users/change-password", data);
  }
}

export const userApi = new UserApi()