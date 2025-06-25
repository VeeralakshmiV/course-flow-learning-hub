
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const Index = () => {
  const handleLogout = () => {
    // Placeholder logout function
    console.log('Logout clicked');
  };

  // Default to admin dashboard for now
  return <AdminDashboard onLogout={handleLogout} />;
};

export default Index;
