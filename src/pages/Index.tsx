
import { useAuthStore } from '@/stores/authStore';
import AuthPage from '@/components/auth/AuthPage';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import StaffDashboard from '@/components/dashboards/StaffDashboard';
import StudentDashboard from '@/components/dashboards/StudentDashboard';

const Index = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <AuthPage />;
  }

  const handleLogout = () => {
    logout();
  };

  switch (user.role) {
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    case 'staff':
      return <StaffDashboard onLogout={handleLogout} />;
    case 'student':
      return <StudentDashboard onLogout={handleLogout} />;
    default:
      return <AuthPage />;
  }
};

export default Index;
