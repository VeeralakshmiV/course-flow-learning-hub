
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'student';
  created_at: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'admin' | 'staff' | 'student') => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  setAuth: (session: Session | null) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,

      initialize: async () => {
        try {
          // Get initial session
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;

          await get().setAuth(session);

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            await get().setAuth(session);
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ isLoading: false });
        }
      },

      setAuth: async (session: Session | null) => {
        if (session?.user) {
          try {
            // Fetch user profile
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error) throw error;

            // Ensure role is properly typed
            const typedProfile: Profile = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role as 'admin' | 'staff' | 'student',
              created_at: profile.created_at
            };

            set({
              user: session.user,
              profile: typedProfile,
              session,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.error('Profile fetch error:', error);
            set({
              user: session.user,
              profile: null,
              session,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } else {
          set({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;
          // setAuth will be called by the auth state change listener
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string, role: 'admin' | 'staff' | 'student') => {
        try {
          set({ isLoading: true });
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
                role,
              },
            },
          });

          if (error) throw error;
          // setAuth will be called by the auth state change listener
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut();
          // setAuth will be called by the auth state change listener
        } catch (error) {
          console.error('Logout error:', error);
          // Clear state anyway
          set({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Don't persist sensitive auth data
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
