
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import AuthPage from '@/components/auth/AuthPage';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import StaffDashboard from '@/components/dashboards/StaffDashboard';
import StudentDashboard from '@/components/dashboards/StudentDashboard';

const Index = () => {
  const { isAuthenticated, profile, isLoading, logout, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // For testing purposes, bypass authentication and go directly to admin dashboard
  const handleLogout = async () => {
    await logout();
  };

  // Temporarily bypass authentication for testing
  return <AdminDashboard onLogout={handleLogout} />;

  // Original authentication logic (commented out for testing)
  /*
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !profile) {
    return <AuthPage />;
  }

  switch (profile.role) {
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    case 'staff':
      return <StaffDashboard onLogout={handleLogout} />;
    case 'student':
      return <StudentDashboard onLogout={handleLogout} />;
    default:
      return <AuthPage />;
  }
  */
};

export default Index;
