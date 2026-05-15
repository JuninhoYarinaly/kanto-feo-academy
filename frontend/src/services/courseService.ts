import type { RawCourseData } from "@/types/api";
import { api } from "../lib/api";
import type {
  Course,
  CreateCourseDto,
  UpdateCourseDto,
  CourseLevel,
  Enrollment,
  Progress,
} from "../types";

export const courseService = {
  async getAll(): Promise<Course[]> {
    const response = await api.get<RawCourseData[]>("/course");
    return response.data.map((item) => ({
      id: item.course_id,
      title: item.title,
      description: item.description,
      videoUrl: item.video_url ?? undefined,
      duration: undefined,
      level: item.level as CourseLevel,
      instrumentId: item.instrument_id,
      createdAt: item.publication_date,
      updatedAt: item.publication_date,
    }));
  },

  async getById(id: number): Promise<Course> {
    const response = await api.get<Course>(`/course/${id}`);
    return response.data;
  },

  async create(courseData: CreateCourseDto): Promise<Course> {
    const response = await api.post<Course>("/course", courseData);
    return response.data;
  },

  async update(id: number, courseData: UpdateCourseDto): Promise<Course> {
    const response = await api.patch<Course>(`/course/${id}`, courseData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/course/${id}`);
  },

  async getByLevel(level: CourseLevel): Promise<Course[]> {
    const response = await api.get<Course[]>(`/course/level/${level}`);
    return response.data;
  },

  async getByInstrument(instrumentId: number): Promise<Course[]> {
    const response = await api.get<Course[]>(
      `/course/instrument/${instrumentId}`
    );
    return response.data;
  },

  async getEnrollments(courseId: number): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(
      `/enrollment/course/${courseId}`
    );
    return response.data;
  },

  async getProgress(courseId: number): Promise<Progress[]> {
    const response = await api.get<Progress[]>(`/progress/course/${courseId}`);
    return response.data;
  },
};
