
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, Settings, ChevronRight } from "lucide-react";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import StaffDashboard from "@/components/dashboards/StaffDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";

type UserRole = 'admin' | 'staff' | 'student' | null;

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  if (currentRole) {
    switch (currentRole) {
      case 'admin':
        return <AdminDashboard onLogout={() => setCurrentRole(null)} />;
      case 'staff':
        return <StaffDashboard onLogout={() => setCurrentRole(null)} />;
      case 'student':
        return <StudentDashboard onLogout={() => setCurrentRole(null)} />;
    }
  }

  const roles = [
    {
      id: 'admin' as const,
      title: 'Administrator',
      description: 'Full system access with user and course management',
      icon: Settings,
      color: 'bg-red-500',
      features: ['User Management', 'Course CRUD', 'System Settings', 'Analytics']
    },
    {
      id: 'staff' as const,
      title: 'Staff/Instructor',
      description: 'Create and manage courses and lessons',
      icon: Users,
      color: 'bg-blue-500',
      features: ['Course Creation', 'Lesson Editor', 'Student Progress', 'Content Management']
    },
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Access courses and track learning progress',
      icon: GraduationCap,
      color: 'bg-green-500',
      features: ['Course Access', 'Progress Tracking', 'Interactive Learning', 'Certificates']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">EduFlow LMS</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive Learning Management System with dynamic content and multi-role support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card key={role.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{role.title}</CardTitle>
                  <CardDescription className="text-gray-600">{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-6 group-hover:bg-opacity-90 transition-all duration-300" 
                    size="lg"
                    onClick={() => setCurrentRole(role.id)}
                  >
                    Enter as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Demo Mode - Choose any role to explore the system
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Index;
