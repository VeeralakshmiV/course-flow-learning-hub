
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { CourseContent, QuizQuestion } from '@/types/courseTypes';

interface ContentState {
  content: Record<string, CourseContent[]>;
  quizQuestions: Record<string, QuizQuestion[]>;
  createContent: (sectionId: string, content: Omit<CourseContent, 'id'>) => Promise<void>;
  updateContent: (id: string, updates: Partial<CourseContent>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  createQuizQuestion: (contentId: string, question: Omit<QuizQuestion, 'id'>) => Promise<void>;
  updateQuizQuestion: (id: string, updates: Partial<QuizQuestion>) => Promise<void>;
  deleteQuizQuestion: (id: string) => Promise<void>;
  setContent: (sectionId: string, content: CourseContent[]) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  content: {},
  quizQuestions: {},

  setContent: (sectionId: string, content: CourseContent[]) => {
    set(state => ({
      content: {
        ...state.content,
        [sectionId]: content
      }
    }));
  },

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
      throw error;
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
      throw error;
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
      throw error;
    }
  },

  // Quiz question actions (placeholder implementations)
  createQuizQuestion: async (contentId, questionData) => {
    try {
      console.log('Quiz question creation will be implemented after database migration');
    } catch (error) {
      console.error('Error creating quiz question:', error);
      throw error;
    }
  },

  updateQuizQuestion: async (id, updates) => {
    try {
      console.log('Quiz question update will be implemented after database migration');
    } catch (error) {
      console.error('Error updating quiz question:', error);
      throw error;
    }
  },

  deleteQuizQuestion: async (id) => {
    try {
      console.log('Quiz question deletion will be implemented after database migration');
    } catch (error) {
      console.error('Error deleting quiz question:', error);
      throw error;
    }
  }
}));
