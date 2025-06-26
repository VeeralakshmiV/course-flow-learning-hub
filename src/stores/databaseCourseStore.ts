
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

// Updated types to match actual database schema
export interface DatabaseCourse {
  id: string;
  name: string;
  description: string | null;
  instructor_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  sections: CourseSection[];
  status: 'draft' | 'published';
  enrollment_fee: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseContent[];
}

export interface CourseContent {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'assignment';
  content: string;
  order: number;
  is_free: boolean;
  video_url?: string;
  duration_minutes?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

interface DatabaseCourseState {
  courses: Course[];
  sections: Record<string, CourseSection[]>;
  content: Record<string, CourseContent[]>;
  quizQuestions: Record<string, QuizQuestion[]>;
  isLoading: boolean;
  error: string | null;

  // Course actions
  fetchCourses: () => Promise<void>;
  fetchCourseWithDetails: (courseId: string) => Promise<Course | null>;
  createCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'sections'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;

  // Section actions  
  createSection: (courseId: string, section: Omit<CourseSection, 'id' | 'lessons'>) => Promise<void>;
  updateSection: (id: string, updates: Partial<CourseSection>) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;

  // Content actions
  createContent: (sectionId: string, content: Omit<CourseContent, 'id'>) => Promise<void>;
  updateContent: (id: string, updates: Partial<CourseContent>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;

  // Quiz actions
  createQuizQuestion: (contentId: string, question: Omit<QuizQuestion, 'id'>) => Promise<void>;
  updateQuizQuestion: (id: string, updates: Partial<QuizQuestion>) => Promise<void>;
  deleteQuizQuestion: (id: string) => Promise<void>;
}

// Helper function to convert database course to frontend course
const convertDatabaseCourse = (dbCourse: DatabaseCourse, sections: CourseSection[] = []): Course => ({
  id: dbCourse.id,
  title: dbCourse.name,
  description: dbCourse.description || '',
  instructor: dbCourse.instructor_id || 'Unknown',
  sections: sections,
  status: 'draft' as const,
  enrollment_fee: 0,
  createdAt: dbCourse.created_at,
  updatedAt: dbCourse.updated_at
});

export const useDatabaseCourseStore = create<DatabaseCourseState>((set, get) => ({
  courses: [],
  sections: {},
  content: {},
  quizQuestions: {},
  isLoading: false,
  error: null,

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
    }
  },

  // Section actions
  createSection: async (courseId, sectionData) => {
    try {
      const { data, error } = await supabase
        .from('course_sections')
        .insert({
          course_id: courseId,
          title: sectionData.title,
          order_index: sectionData.order
        })
        .select()
        .single();

      if (error) throw error;

      const newSection: CourseSection = {
        id: data.id,
        title: data.title,
        order: data.order_index,
        lessons: []
      };

      set(state => ({
        courses: state.courses.map(course => 
          course.id === courseId 
            ? { ...course, sections: [...course.sections, newSection] }
            : course
        )
      }));
    } catch (error) {
      console.error('Error creating section:', error);
      set({ error: 'Failed to create section' });
    }
  },

  updateSection: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('course_sections')
        .update({
          title: updates.title,
          order_index: updates.order
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating section:', error);
      set({ error: 'Failed to update section' });
    }
  },

  deleteSection: async (id) => {
    try {
      const { error } = await supabase
        .from('course_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting section:', error);
      set({ error: 'Failed to delete section' });
    }
  },

  // Content actions
  createContent: async (sectionId, contentData) => {
    try {
      const { data, error } = await supabase
        .from('course_content')
        .insert({
          section_id: sectionId,
          title: contentData.title,
          content: contentData.content,
          type: contentData.type,
          order_index: contentData.order,
        })
        .select()
        .single();

      if (error) throw error;

      const newContent: CourseContent = {
        id: data.id,
        title: data.title,
        content: data.content || '',
        type: data.type as 'lesson' | 'quiz' | 'assignment',
        order: data.order_index,
        is_free: false,
      };

      set(state => ({
        content: {
          ...state.content,
          [sectionId]: [...(state.content[sectionId] || []), newContent]
        }
      }));
    } catch (error) {
      console.error('Error creating content:', error);
      set({ error: 'Failed to create content' });
    }
  },

  updateContent: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('course_content')
        .update({
          title: updates.title,
          content: updates.content,
          type: updates.type,
          order_index: updates.order,
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating content:', error);
      set({ error: 'Failed to update content' });
    }
  },

  deleteContent: async (id) => {
    try {
      const { error } = await supabase
        .from('course_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting content:', error);
      set({ error: 'Failed to delete content' });
    }
  },

  // Quiz question actions (placeholder implementations)
  createQuizQuestion: async (contentId, questionData) => {
    try {
      console.log('Quiz question creation will be implemented after database migration');
    } catch (error) {
      console.error('Error creating quiz question:', error);
      set({ error: 'Failed to create quiz question' });
    }
  },

  updateQuizQuestion: async (id, updates) => {
    try {
      console.log('Quiz question update will be implemented after database migration');
    } catch (error) {
      console.error('Error updating quiz question:', error);
      set({ error: 'Failed to update quiz question' });
    }
  },

  deleteQuizQuestion: async (id) => {
    try {
      console.log('Quiz question deletion will be implemented after database migration');
    } catch (error) {
      console.error('Error deleting quiz question:', error);
      set({ error: 'Failed to delete quiz question' });
    }
  }
}));
