
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import AuthPage from '@/components/auth/AuthPage';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import StaffDashboard from '@/components/dashboards/StaffDashboard';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  const { isAuthenticated, profile, isLoading, logout, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !profile) {
    return <LandingPage />;
  }

  switch (profile.role) {
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    case 'staff':
      return <StaffDashboard onLogout={handleLogout} />;
    case 'student':
      return <StudentDashboard onLogout={handleLogout} />;
    default:
      return <LandingPage />;
  }
};

export default Index;
