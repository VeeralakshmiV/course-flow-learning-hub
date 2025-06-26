import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserPlus, Edit, Trash2, Plus } from "lucide-react";
import UserCreationForm from "./UserCreationForm";

const UserManager = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', enrolledCourses: 3 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'staff', status: 'active', enrolledCourses: 0 },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'student', status: 'inactive', enrolledCourses: 1 },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'staff': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New User</h2>
            <p className="text-gray-600">Add staff or student accounts to the system</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowCreateForm(false)}
            className="flex items-center gap-2"
          >
            Back to Users
          </Button>
        </div>
        <UserCreationForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage system users and their roles</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowCreateForm(true)}
        >
          <UserPlus className="h-4 w-4" />
          Create User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'student').length}
              </p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'staff').length}
              </p>
              <p className="text-sm text-gray-500">Staff</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Plus className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <Button 
                variant="ghost" 
                className="p-0 h-auto text-left"
                onClick={() => setShowCreateForm(true)}
              >
                <div>
                  <p className="text-2xl font-bold text-gray-900">+</p>
                  <p className="text-sm text-gray-500">Add New User</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {user.role === 'student' && (
                      <p className="text-xs text-gray-400">
                        Enrolled in {user.enrolledCourses} courses
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManager;