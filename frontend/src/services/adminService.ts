import { api } from "../lib/api";
import type { Admin, CreateAdminDto, UpdateAdminDto } from "../types";

export const adminService = {
  async getAll(): Promise<Admin[]> {
    const response = await api.get<Admin[]>("/admin");
    return response.data;
  },

  async getById(id: number): Promise<Admin> {
    const response = await api.get<Admin>(`/admin/${id}`);
    return response.data;
  },

  async create(adminData: CreateAdminDto): Promise<Admin> {
    const response = await api.post<Admin>("/admin", adminData);
    return response.data;
  },

  async update(id: number, adminData: UpdateAdminDto): Promise<Admin> {
    const response = await api.patch<Admin>(`/admin/${id}`, adminData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/admin/${id}`);
  },

  async getStats(): Promise<{
    totalStudents: number;
    totalCourses: number;
    totalPayments: number;
    activeStudents: number;
  }> {
    const response = await api.get("/admin/stats");
    return response.data;
  },
};
