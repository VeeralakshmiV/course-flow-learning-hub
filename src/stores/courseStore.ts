
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  createdAt: Date;
  updatedAt: Date;
}

interface CourseStore {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCourse: (id: string) => Course | undefined;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: [
        {
          id: 'demo-course-1',
          title: 'Introduction to Web Development',
          description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
          sections: [
            {
              id: 'section-1',
              title: 'Getting Started',
              lessons: [
                {
                  id: 'lesson-1',
                  title: 'What is Web Development?',
                  content: `# Welcome to Web Development

Web development is the process of building and maintaining websites. It involves several different aspects:

## Frontend Development
- **HTML**: The structure of web pages
- **CSS**: Styling and layout
- **JavaScript**: Interactive functionality

## Backend Development
- Server-side programming
- Database management
- API development

## Key Concepts
- Responsive design
- User experience (UX)
- Performance optimization

Let's start your journey into the exciting world of web development!`
                },
                {
                  id: 'lesson-2',
                  title: 'Setting Up Your Environment',
                  content: `# Development Environment Setup

Before we start coding, let's set up your development environment.

## Required Tools
- **Code Editor**: VS Code, Sublime Text, or Atom
- **Web Browser**: Chrome, Firefox, or Safari
- **Version Control**: Git

## Installation Steps
1. Download and install a code editor
2. Install Git for version control
3. Set up a local development server
4. Configure your browser dev tools

## Best Practices
- Keep your workspace organized
- Use consistent naming conventions
- Comment your code regularly

You're now ready to start building amazing websites!`
                }
              ]
            },
            {
              id: 'section-2',
              title: 'HTML Fundamentals',
              lessons: [
                {
                  id: 'lesson-3',
                  title: 'HTML Structure and Elements',
                  content: `# HTML Structure and Elements

HTML (HyperText Markup Language) is the foundation of all web pages.

## Basic Structure
Every HTML document has a basic structure:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>Main Heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

## Common Elements
- **Headings**: h1, h2, h3, h4, h5, h6
- **Paragraphs**: p
- **Links**: a
- **Images**: img
- **Lists**: ul, ol, li

## Semantic HTML
Use semantic elements to improve accessibility and SEO:
- header, nav, main, section, article, aside, footer

Practice creating HTML documents with proper structure and semantic elements!`
                }
              ]
            }
          ],
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20')
        }
      ],
      addCourse: (courseData) => {
        const newCourse: Course = {
          ...courseData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          courses: [...state.courses, newCourse],
        }));
      },
      updateCourse: (id, updates) => {
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === id
              ? { ...course, ...updates, updatedAt: new Date() }
              : course
          ),
        }));
      },
      deleteCourse: (id) => {
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id),
        }));
      },
      getCourse: (id) => {
        return get().courses.find((course) => course.id === id);
      },
    }),
    {
      name: 'course-store',
    }
  )
);
