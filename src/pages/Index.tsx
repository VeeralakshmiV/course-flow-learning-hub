
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, Settings, ChevronRight, Sparkles } from "lucide-react";
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
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      hoverColor: 'group-hover:from-red-600 group-hover:to-red-700',
      features: ['User Management', 'Course CRUD', 'System Settings', 'Analytics'],
      glow: 'group-hover:shadow-red-500/25'
    },
    {
      id: 'staff' as const,
      title: 'Staff/Instructor',
      description: 'Create and manage courses and lessons',
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hoverColor: 'group-hover:from-blue-600 group-hover:to-blue-700',
      features: ['Course Creation', 'Lesson Editor', 'Student Progress', 'Content Management'],
      glow: 'group-hover:shadow-blue-500/25'
    },
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Access courses and track learning progress',
      icon: GraduationCap,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      hoverColor: 'group-hover:from-green-600 group-hover:to-green-700',
      features: ['Course Access', 'Progress Tracking', 'Interactive Learning', 'Certificates'],
      glow: 'group-hover:shadow-green-500/25'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6 group">
            <div className="relative">
              <BookOpen className="h-16 w-16 text-blue-600 mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              EduFlow LMS
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive Learning Management System with dynamic content, 
            <span className="font-semibold text-blue-600"> multi-role support</span>, and 
            <span className="font-semibold text-purple-600"> seamless course management</span>
          </p>
          <div className="mt-6 flex justify-center">
            <Badge variant="secondary" className="px-6 py-2 text-sm bg-white/80 backdrop-blur-sm border border-gray-200/50">
              ✨ Built with React, TypeScript & MySQL
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 ${role.glow} hover:shadow-xl animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="text-center pb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className={`w-20 h-20 ${role.color} ${role.hoverColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mt-2">
                      {role.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-all duration-300 hover:translate-x-1"
                        style={{ transitionDelay: `${featureIndex * 50}ms` }}
                      >
                        <ChevronRight className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 group-hover:text-green-600 transition-colors duration-300" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-8 group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl" 
                    size="lg"
                    onClick={() => setCurrentRole(role.id)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Enter as {role.title}
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-200/50 shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <Badge variant="secondary" className="px-4 py-1 text-sm bg-transparent border-none">
              Demo Mode - Choose any role to explore the system
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
