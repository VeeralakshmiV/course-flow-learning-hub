
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, GraduationCap, LogIn } from 'lucide-react';
import AuthPage from './auth/AuthPage';

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-10 w-10 text-blue-600 mr-4" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learning Management System
                </h1>
                <p className="text-sm text-gray-600 mt-1">Empowering education through technology</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <LogIn className="h-5 w-5" />
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Learning Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive learning management system designed for administrators, staff, and students. 
            Contact your administrator to get started with your account credentials.
          </p>
          <Button 
            onClick={() => setShowAuth(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            <LogIn className="h-6 w-6 mr-2" />
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-100 rounded-full">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Admin Dashboard</CardTitle>
              <CardDescription className="text-gray-600">
                Complete system management and user administration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Create and manage user accounts</li>
                <li>• System-wide course management</li>
                <li>• Payment processing oversight</li>
                <li>• Analytics and reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Staff Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Course creation and student management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Create and edit courses</li>
                <li>• Manage course content</li>
                <li>• Track student progress</li>
                <li>• Course analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Student Access</CardTitle>
              <CardDescription className="text-gray-600">
                Interactive learning and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Access enrolled courses</li>
                <li>• Interactive lessons and quizzes</li>
                <li>• Track learning progress</li>
                <li>• Course discussions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Sign in with your credentials provided by your administrator to access your personalized dashboard.
          </p>
          <Button 
            onClick={() => setShowAuth(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            <LogIn className="h-6 w-6 mr-2" />
            Sign In Now
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Learning Management System. All rights reserved.</p>
            <p className="mt-2 text-sm">
              For account access, please contact your system administrator.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
