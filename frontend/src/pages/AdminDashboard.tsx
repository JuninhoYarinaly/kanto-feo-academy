import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, BookOpen, TrendingUp, Calendar, DollarSign, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "./dashboard/DashboardLayout";
import { courseService } from "@/services/courseService";
import { studentService } from "@/services/studentService";
import { authService } from "@/services/authService";
import type { Course, Student } from "@/types";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
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

      // Load courses data
      const coursesData = await courseService.getAll();
      setCourses(coursesData);

      // Load students data
      const studentsData = await studentService.getAll();
      setStudents(studentsData);

    } catch (error) {
      console.error('Error loading admin dashboard data:', error);
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

  const totalCourses = courses.length;
  const totalStudents = students.length;
  const beginnersCourses = courses.filter(c => c.level === 'BEGINNER').length;
  const advancedCourses = courses.filter(c => c.level === 'ADVANCED').length;
  const intermediateCourses = courses.filter(c => c.level === 'INTERMEDIATE').length;

  // Calculate course distribution by level
  const courseDistribution = [
    { name: 'Débutant', value: beginnersCourses, color: 'bg-green-500' },
    { name: 'Intermédiaire', value: intermediateCourses, color: 'bg-yellow-500' },
    { name: 'Avancé', value: advancedCourses, color: 'bg-red-500' }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Tableau de bord Admin
            </h1>
            <p className="text-muted-foreground">
              Gérez votre académie de musique
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/courses/new">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Créer un cours
              </Button>
            </Link>
            <Link to="/admin/students/new">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Ajouter un étudiant
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCourses}</p>
                  <p className="text-sm text-muted-foreground">Total cours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total étudiants</p>
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
                  <p className="text-2xl font-bold">{beginnersCourses}</p>
                  <p className="text-sm text-muted-foreground">Cours débutants</p>
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
                  <p className="text-2xl font-bold">{advancedCourses}</p>
                  <p className="text-sm text-muted-foreground">Cours avancés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-serif">Distribution des cours par niveau</CardTitle>
              <CardDescription>Répartition des cours selon leur niveau de difficulté</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courseDistribution.map((item, index) => {
                const percentage = totalCourses > 0 ? Math.round((item.value / totalCourses) * 100) : 0;
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.name}</span>
                      <span className="font-medium">{item.value} cours ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/courses">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BookOpen className="h-4 w-4" />
                  Gérer les cours
                </Button>
              </Link>
              <Link to="/admin/students">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Gérer les étudiants
                </Button>
              </Link>
              <Link to="/admin/payments">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <DollarSign className="h-4 w-4" />
                  Voir les paiements
                </Button>
              </Link>
              <Link to="/admin/schedule">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  Gérer l'emploi du temps
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-serif">Cours récents</CardTitle>
              <CardDescription>Derniers cours ajoutés à la plateforme</CardDescription>
            </div>
            <Link to="/admin/courses">
              <Button variant="ghost" className="gap-1">
                Voir tout <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.slice(0, 6).map((course) => (
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
                    <Badge className={`absolute top-2 right-2 ${
                      course.level === 'BEGINNER' ? 'bg-green-500' :
                      course.level === 'INTERMEDIATE' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {course.level === 'BEGINNER' ? 'Débutant' :
                       course.level === 'INTERMEDIATE' ? 'Intermédiaire' : 'Avancé'}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm line-clamp-2">{course.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{course.description?.substring(0, 50)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-serif">Étudiants récents</CardTitle>
              <CardDescription>Derniers étudiants inscrits</CardDescription>
            </div>
            <Link to="/admin/students">
              <Button variant="ghost" className="gap-1">
                Voir tout <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.slice(0, 5).map((student) => (
                <div key={student.student_id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {student.first_name?.[0]}{student.last_name?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.first_name} {student.last_name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{student.current_level || 'N/A'}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {student.instrument?.name || 'Aucun instrument'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
