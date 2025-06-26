
import { ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import AuthPage from './AuthPage';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('admin' | 'staff' | 'student')[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, profile } = useAuthStore();

  if (!isAuthenticated || !profile) {
    return <AuthPage />;
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
