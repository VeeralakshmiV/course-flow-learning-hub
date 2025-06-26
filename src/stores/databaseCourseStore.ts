
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  enrollment_fee: number;
  instructor_id: string;
  created_at: string;
  updated_at: string;
}

export interface CourseSection {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CourseContent {
  id: string;
  section_id: string;
  title: string;
  content?: string;
  type: 'lesson' | 'quiz' | 'assignment';
  order_index: number;
  video_url?: string;
  duration_minutes?: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  content_id: string;
  question: string;
  question_type: string;
  options: any;
  correct_answer: any;
  explanation?: string;
  points: number;
  order_index: number;
}

interface DatabaseCourseStore {
  courses: Course[];
  sections: Record<string, CourseSection[]>;
  content: Record<string, CourseContent[]>;
  quizQuestions: Record<string, QuizQuestion[]>;
  isLoading: boolean;
  error: string | null;
  
  // Course operations
  fetchCourses: () => Promise<void>;
  createCourse: (course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  
  // Section operations
  fetchSections: (courseId: string) => Promise<void>;
  createSection: (section: Omit<CourseSection, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateSection: (id: string, updates: Partial<CourseSection>) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;
  
  // Content operations
  fetchContent: (sectionId: string) => Promise<void>;
  createContent: (content: Omit<CourseContent, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateContent: (id: string, updates: Partial<CourseContent>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  
  // Quiz operations
  fetchQuizQuestions: (contentId: string) => Promise<void>;
  createQuizQuestion: (question: Omit<QuizQuestion, 'id'>) => Promise<void>;
  updateQuizQuestion: (id: string, updates: Partial<QuizQuestion>) => Promise<void>;
  deleteQuizQuestion: (id: string) => Promise<void>;
}

export const useDatabaseCourseStore = create<DatabaseCourseStore>((set, get) => ({
  courses: [],
  sections: {},
  content: {},
  quizQuestions: {},
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ courses: data || [], isLoading: false });
    } catch (error) {
      console.error('Fetch courses error:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createCourse: async (courseData) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single();

      if (error) throw error;
      
      const currentCourses = get().courses;
      set({ 
        courses: [data, ...currentCourses], 
        isLoading: false 
      });
    } catch (error) {
      console.error('Create course error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateCourse: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const currentCourses = get().courses;
      set({ 
        courses: currentCourses.map(course => 
          course.id === id ? data : course
        ), 
        isLoading: false 
      });
    } catch (error) {
      console.error('Update course error:', error);
      set({ error: (error as Error).message, isLoading: false });
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
      
      const currentCourses = get().courses;
      set({ 
        courses: currentCourses.filter(course => course.id !== id), 
        isLoading: false 
      });
    } catch (error) {
      console.error('Delete course error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  fetchSections: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('course_sections')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      const currentSections = get().sections;
      set({ 
        sections: { ...currentSections, [courseId]: data || [] }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Fetch sections error:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createSection: async (sectionData) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('course_sections')
        .insert([sectionData])
        .select()
        .single();

      if (error) throw error;
      
      const currentSections = get().sections;
      const courseId = sectionData.course_id;
      const courseSections = currentSections[courseId] || [];
      
      set({ 
        sections: { 
          ...currentSections, 
          [courseId]: [...courseSections, data] 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Create section error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateSection: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('course_sections')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const currentSections = get().sections;
      const courseId = data.course_id;
      const courseSections = currentSections[courseId] || [];
      
      set({ 
        sections: { 
          ...currentSections, 
          [courseId]: courseSections.map(section => 
            section.id === id ? data : section
          ) 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Update section error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deleteSection: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // First get the section to know which course it belongs to
      const { data: sectionData, error: fetchError } = await supabase
        .from('course_sections')
        .select('course_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error } = await supabase
        .from('course_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      const currentSections = get().sections;
      const courseId = sectionData.course_id;
      const courseSections = currentSections[courseId] || [];
      
      set({ 
        sections: { 
          ...currentSections, 
          [courseId]: courseSections.filter(section => section.id !== id) 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Delete section error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  fetchContent: async (sectionId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('course_content')
        .select('*')
        .eq('section_id', sectionId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      const currentContent = get().content;
      set({ 
        content: { ...currentContent, [sectionId]: data || [] }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Fetch content error:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createContent: async (contentData) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('course_content')
        .insert([contentData])
        .select()
        .single();

      if (error) throw error;
      
      const currentContent = get().content;
      const sectionId = contentData.section_id;
      const sectionContent = currentContent[sectionId] || [];
      
      set({ 
        content: { 
          ...currentContent, 
          [sectionId]: [...sectionContent, data] 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Create content error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateContent: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('course_content')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const currentContent = get().content;
      const sectionId = data.section_id;
      const sectionContent = currentContent[sectionId] || [];
      
      set({ 
        content: { 
          ...currentContent, 
          [sectionId]: sectionContent.map(content => 
            content.id === id ? data : content
          ) 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Update content error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deleteContent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // First get the content to know which section it belongs to
      const { data: contentData, error: fetchError } = await supabase
        .from('course_content')
        .select('section_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error } = await supabase
        .from('course_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      const currentContent = get().content;
      const sectionId = contentData.section_id;
      const sectionContent = currentContent[sectionId] || [];
      
      set({ 
        content: { 
          ...currentContent, 
          [sectionId]: sectionContent.filter(content => content.id !== id) 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Delete content error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  fetchQuizQuestions: async (contentId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('content_id', contentId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      const currentQuestions = get().quizQuestions;
      set({ 
        quizQuestions: { ...currentQuestions, [contentId]: data || [] }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Fetch quiz questions error:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createQuizQuestion: async (questionData) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .insert([questionData])
        .select()
        .single();

      if (error) throw error;
      
      const currentQuestions = get().quizQuestions;
      const contentId = questionData.content_id;
      const contentQuestions = currentQuestions[contentId] || [];
      
      set({ 
        quizQuestions: { 
          ...currentQuestions, 
          [contentId]: [...contentQuestions, data] 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Create quiz question error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateQuizQuestion: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const currentQuestions = get().quizQuestions;
      const contentId = data.content_id;
      const contentQuestions = currentQuestions[contentId] || [];
      
      set({ 
        quizQuestions: { 
          ...currentQuestions, 
          [contentId]: contentQuestions.map(question => 
            question.id === id ? data : question
          ) 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Update quiz question error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deleteQuizQuestion: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // First get the question to know which content it belongs to
      const { data: questionData, error: fetchError } = await supabase
        .from('quiz_questions')
        .select('content_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      const currentQuestions = get().quizQuestions;
      const contentId = questionData.content_id;
      const contentQuestions = currentQuestions[contentId] || [];
      
      set({ 
        quizQuestions: { 
          ...currentQuestions, 
          [contentId]: contentQuestions.filter(question => question.id !== id) 
        }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Delete quiz question error:', error);
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));
