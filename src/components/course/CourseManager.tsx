
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, BookOpen } from "lucide-react";
import { useDatabaseCourseStore } from "@/stores/databaseCourseStore";
import { useAuthStore } from "@/stores/authStore";
import CourseEditor from "./CourseEditor";
import { useToast } from "@/hooks/use-toast";

interface CourseManagerProps {
  role: 'admin' | 'staff';
}

const CourseManager = ({ role }: CourseManagerProps) => {
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { 
    courses, 
    sections,
    isLoading, 
    error, 
    fetchCourses, 
    deleteCourse,
    fetchSections 
  } = useDatabaseCourseStore();
  const { profile } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        toast({
          title: "Success",
          description: "Course deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete course",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditCourse = async (courseId: string) => {
    // Fetch sections for the course before editing
    await fetchSections(courseId);
    setEditingCourse(courseId);
  };

  if (editingCourse || isCreating) {
    const course = editingCourse ? courses.find(c => c.id === editingCourse) : undefined;
    return (
      <CourseEditor
        course={course}
        onClose={() => {
          setEditingCourse(null);
          setIsCreating(false);
        }}
      />
    );
  }

  if (isLoading && courses.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
          <p className="text-gray-600">Create and manage your courses</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
            <p className="text-gray-600 mb-4">Create your first course to get started</p>
            <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const courseSections = sections[course.id] || [];
            return (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-2">{course.description}</CardDescription>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                        {course.enrollment_fee > 0 && (
                          <Badge variant="outline">
                            ${course.enrollment_fee}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {courseSections.length} sections
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCourse(course.id)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    {role === 'admin' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseManager;
