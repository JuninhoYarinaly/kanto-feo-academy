import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, TrendingUp, Clock, Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { studentService } from "@/services/studentService";
import { courseService } from "@/services/courseService";
import { authService } from "@/services/authService";
import type { Student, Schedule, Progress as ProgressType, Course } from "@/types";
import { toast } from "sonner";

const Dashboard = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [progress, setProgress] = useState<ProgressType[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Load student data - Using ID 1 for demo, should get from token
      const studentData = await studentService.getById(1);
      setStudent(studentData);

      // Load schedules
      const schedulesData = await studentService.getSchedules(studentData.student_id);
      setSchedules(schedulesData);

      // Load progress
      const progressData = await studentService.getProgress(studentData.student_id);
      setProgress(progressData);

      // Load courses
      const coursesData = await courseService.getAll();
      setCourses(coursesData);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-48"></div>
            <div className="h-4 bg-muted rounded w-96"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const enrolledCourses = courses.filter(course => 
    student?.enrollments?.some(enrollment => enrollment.courseId === course.id)
  );
  const totalLessons = enrolledCourses.length;
  const completedLessons = progress.filter(p => p.completionPercentage === 100).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const weeklySchedules = schedules.filter(s => s.isActive).length;
  const practiceTime = Math.round(progress.reduce((acc, p) => acc + (p.completionPercentage * 0.5), 0)); // Estimation

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Bonjour, {student?.first_name || 'Élève'} ! 👋
            </h1>
            <p className="text-muted-foreground">
              Prêt à continuer votre apprentissage musical ?
            </p>
          </div>
          <Link to="/dashboard/courses">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4" />
              Reprendre le cours
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedLessons}/{totalLessons}</p>
                  <p className="text-sm text-muted-foreground">Leçons terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{practiceTime}h</p>
                  <p className="text-sm text-muted-foreground">Temps de pratique</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                  <p className="text-sm text-muted-foreground">Progression</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{weeklySchedules}</p>
                  <p className="text-sm text-muted-foreground">Cours cette semaine</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-serif">Progression actuelle</CardTitle>
              <CardDescription>Votre progression globale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {progress.slice(0, 4).map((progressItem, index) => {
                const course = courses.find(c => c.id === progressItem.courseId);
                return (
                  <div key={progressItem.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{course?.title || `Module ${index + 1}`}</span>
                      <span className={`font-medium ${progressItem.completionPercentage === 100 ? 'text-green-600' : 'text-primary'}`}>
                        {progressItem.completionPercentage}%
                      </span>
                    </div>
                    <Progress value={progressItem.completionPercentage} className="h-2" />
                  </div>
                );
              })}
              {progress.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Pas de progression enregistrée pour le moment.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Lessons */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Emploi du temps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {schedules.slice(0, 3).map((schedule) => (
                <div 
                  key={schedule.id}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <p className="font-medium text-sm">Cours de {student?.instrument?.name || 'musique'}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {schedule.dayOfWeek}
                    </Badge>
                    <span>{schedule.timeSlot}</span>
                    <span>•</span>
                    <span>45 min</span>
                  </div>
                </div>
              ))}
              {schedules.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Pas d'emploi du temps configuré.
                </p>
              )}
              <Link to="/dashboard/calendar">
                <Button variant="outline" className="w-full gap-2">
                  Voir le calendrier
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-serif">Cours disponibles</CardTitle>
              <CardDescription>Découvrez nos cours de musique</CardDescription>
            </div>
            <Link to="/dashboard/courses">
              <Button variant="ghost" className="gap-1">
                Voir tout <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.slice(0, 6).map((course) => {
                const courseProgress = progress.find(p => p.courseId === course.id);
                const isCompleted = courseProgress?.completionPercentage === 100;
                
                return (
                  <div 
                    key={course.id}
                    className="group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
                  >
                    <div className="relative aspect-video">
                      <img 
                        src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=225&fit=crop" 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <Play className="h-5 w-5 text-white ml-1" />
                        </div>
                      </div>
                      <Badge className={`absolute top-2 right-2 ${isCompleted ? 'bg-green-500' : 'bg-orange-500'}`}>
                        {isCompleted ? 'Terminé' : 'En cours'}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm line-clamp-2">{course.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{course.level}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Nouveau cours disponible !</p>
              <p className="text-sm text-muted-foreground">
                "Techniques de picking" vient d'être ajouté à votre programme.
              </p>
            </div>
            <Link to="/dashboard/courses">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Voir
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
