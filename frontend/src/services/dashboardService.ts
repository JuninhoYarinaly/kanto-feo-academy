import { api } from "../lib/api";
import type { Course, Payment, Enrollment } from "../types";

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalPayments: number;
  activeStudents: number;
  beginnersCourses: number;
  intermediateCourses: number;
  advancedCourses: number;
  recentEnrollments: Enrollment[];
  recentPayments: Payment[];
}

export interface StudentDashboardStats {
  enrolledCourses: Course[];
  completedCourses: number;
  totalLessons: number;
  practiceTime: number;
  weeklySchedules: number;
  upcomingLessons: { date: Date; title: string; time: string }[];
  notifications: Notification[];
}

export const dashboardService = {
  async getAdminStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>("/dashboard/admin/stats");
    return response.data;
  },

  async getStudentDashboardStats(
    studentId: number
  ): Promise<StudentDashboardStats> {
    const response = await api.get<StudentDashboardStats>(
      `/dashboard/student/${studentId}/stats`
    );
    return response.data;
  },

  async getRecentEnrollments(limit: number = 5): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(
      `/enrollment/recent?limit=${limit}`
    );
    return response.data;
  },

  async getRecentPayments(limit: number = 5): Promise<Payment[]> {
    const response = await api.get<Payment[]>(`/payment/recent?limit=${limit}`);
    return response.data;
  },

  async getCourseLevelDistribution(): Promise<
    {
      level: string;
      count: number;
      percentage: number;
    }[]
  > {
    const response = await api.get("/courses/distribution");
    return response.data;
  },

  async getStudentProgressSummary(studentId: number): Promise<{
    totalCourses: number;
    completedCourses: number;
    averageProgress: number;
    practiceTime: number;
  }> {
    const response = await api.get(`/student/${studentId}/progress-summary`);
    return response.data;
  },
};
