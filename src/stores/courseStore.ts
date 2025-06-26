
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Course, CourseSection } from '@/types/courseTypes';
import { convertDatabaseCourse } from '@/utils/courseUtils';
import { useSectionStore } from './sectionStore';

interface CourseState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseWithDetails: (courseId: string) => Promise<Course | null>;
  createCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'sections'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  setCourses: (courses: Course[]) => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  setCourses: (courses: Course[]) => {
    set({ courses });
  },

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Fetch sections for each course
      const courses = await Promise.all(
        (coursesData || []).map(async (dbCourse) => {
          const { data: sectionsData, error: sectionsError } = await supabase
            .from('course_sections')
            .select('*, course_content(*)')
            .eq('course_id', dbCourse.id)
            .order('order_index', { ascending: true });

          if (sectionsError) {
            console.error('Error fetching sections:', sectionsError);
            return convertDatabaseCourse(dbCourse);
          }

          const sections: CourseSection[] = (sectionsData || []).map(section => ({
            id: section.id,
            title: section.title,
            order: section.order_index,
            lessons: (section.course_content || []).map((content: any) => ({
              id: content.id,
              title: content.title,
              content: content.content || '',
              type: content.type as 'lesson' | 'quiz' | 'assignment',
              order: content.order_index,
              is_free: false,
            })).sort((a: any, b: any) => a.order - b.order)
          })).sort((a, b) => a.order - b.order);

          // Update section store
          useSectionStore.getState().setSections(dbCourse.id, sections);

          return convertDatabaseCourse(dbCourse, sections);
        })
      );

      set({ courses, isLoading: false });
    } catch (error) {
      console.error('Error fetching courses:', error);
      set({ error: 'Failed to fetch courses', isLoading: false });
    }
  },

  fetchCourseWithDetails: async (courseId: string) => {
    try {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;

      const { data: sectionsData, error: sectionsError } = await supabase
        .from('course_sections')
        .select('*, course_content(*)')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (sectionsError) throw sectionsError;

      const sections: CourseSection[] = (sectionsData || []).map(section => ({
        id: section.id,
        title: section.title,
        order: section.order_index,
        lessons: (section.course_content || []).map((content: any) => ({
          id: content.id,
          title: content.title,
          content: content.content || '',
          type: content.type as 'lesson' | 'quiz' | 'assignment',
          order: content.order_index,
          is_free: false,
        })).sort((a: any, b: any) => a.order - b.order)
      })).sort((a, b) => a.order - b.order);

      return convertDatabaseCourse(courseData, sections);
    } catch (error) {
      console.error('Error fetching course details:', error);
      return null;
    }
  },

  createCourse: async (courseData) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert({
          name: courseData.title,
          description: courseData.description,
          instructor_id: courseData.instructor,
        })
        .select()
        .single();

      if (error) throw error;

      const newCourse = convertDatabaseCourse(data);
      set(state => ({
        courses: [newCourse, ...state.courses],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error creating course:', error);
      set({ error: 'Failed to create course', isLoading: false });
      throw error;
    }
  },

  updateCourse: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({
          name: updates.title,
          description: updates.description,
          instructor_id: updates.instructor,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedCourse = convertDatabaseCourse(data);
      set(state => ({
        courses: state.courses.map(course => 
          course.id === id ? { ...updatedCourse, sections: course.sections } : course
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error updating course:', error);
      set({ error: 'Failed to update course', isLoading: false });
      throw error;
    }
  },

  deleteCourse: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        courses: state.courses.filter(course => course.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error deleting course:', error);
      set({ error: 'Failed to delete course', isLoading: false });
      throw error;
    }
  }
}));
