
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { Lesson } from "@/stores/courseStore";
import QuizEditor from "./QuizEditor";
import AssignmentEditor from "./AssignmentEditor";
import LessonSettings from "./LessonSettings";
import ContentEditor from "./ContentEditor";
import MediaInsertDialog from "./MediaInsertDialog";

interface LessonEditorProps {
  lesson?: Lesson;
  onSave: (lesson: Omit<Lesson, 'id'>) => void;
  onClose: () => void;
}

const LessonEditor = ({ lesson, onSave, onClose }: LessonEditorProps) => {
  const [title, setTitle] = useState(lesson?.title || "");
  const [content, setContent] = useState(lesson?.content || "");
  const [activeTab, setActiveTab] = useState("edit");
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"link" | "image" | "video" | "pdf">("link");
  const [editingQuiz, setEditingQuiz] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(false);
  const [quiz, setQuiz] = useState(lesson?.quiz);
  const [assignment, setAssignment] = useState(lesson?.assignment);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave({
      title,
      content,
      quiz,
      assignment,
    });
  };

  // Show quiz editor
  if (editingQuiz) {
    return (
      <QuizEditor
        quiz={quiz}
        onSave={(quizData) => {
          const newQuiz = {
            id: quiz?.id || Date.now().toString(),
            ...quizData,
          };
          setQuiz(newQuiz);
          setEditingQuiz(false);
        }}
        onClose={() => setEditingQuiz(false)}
      />
    );
  }

  // Show assignment editor
  if (editingAssignment) {
    return (
      <AssignmentEditor
        assignment={assignment}
        onSave={(assignmentData) => {
          const newAssignment = {
            id: assignment?.id || Date.now().toString(),
            ...assignmentData,
          };
          setAssignment(newAssignment);
          setEditingAssignment(false);
        }}
        onClose={() => setEditingAssignment(false)}
      />
    );
  }

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('lesson-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = "";
    switch (format) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'list':
        newText = `\n- ${selectedText || 'list item'}\n`;
        break;
      case 'link':
        setMediaType("link");
        setIsMediaDialogOpen(true);
        return;
      case 'image':
        setMediaType("image");
        setIsMediaDialogOpen(true);
        return;
      case 'video':
        setMediaType("video");
        setIsMediaDialogOpen(true);
        return;
      case 'pdf':
        setMediaType("pdf");
        setIsMediaDialogOpen(true);
        return;
      default:
        return;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const handleUrlInsert = (urlInput: string) => {
    if (!urlInput.trim()) return;

    const textarea = document.getElementById('lesson-content') as HTMLTextAreaElement;
    const start = textarea?.selectionStart || content.length;
    const end = textarea?.selectionEnd || content.length;
    
    let insertText = "";
    switch (mediaType) {
      case 'link':
        insertText = `[Link Text](${urlInput})`;
        break;
      case 'image':
        insertText = `![Image Description](${urlInput})`;
        break;
      case 'video':
        insertText = `\n<video controls width="100%">\n  <source src="${urlInput}" type="video/mp4">\n  Your browser does not support the video tag.\n</video>\n`;
        break;
      case 'pdf':
        insertText = `\n<embed src="${urlInput}" type="application/pdf" width="100%" height="600px" />\n`;
        break;
    }

    const newContent = content.substring(0, start) + insertText + content.substring(end);
    setContent(newContent);
    setIsMediaDialogOpen(false);

    setTimeout(() => {
      textarea?.focus();
    }, 0);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const fileName = file.name;
    const fileType = file.type;

    let insertText = "";
    if (fileType.startsWith('image/')) {
      insertText = `![${fileName}](${fileUrl})`;
    } else if (fileType.startsWith('video/')) {
      insertText = `\n<video controls width="100%">\n  <source src="${fileUrl}" type="${fileType}">\n  Your browser does not support the video tag.\n</video>\n`;
    } else if (fileType === 'application/pdf') {
      insertText = `\n<embed src="${fileUrl}" type="application/pdf" width="100%" height="600px" />\n`;
    } else {
      insertText = `[${fileName}](${fileUrl})`;
    }

    const textarea = document.getElementById('lesson-content') as HTMLTextAreaElement;
    const start = textarea?.selectionStart || content.length;
    const end = textarea?.selectionEnd || content.length;
    
    const newContent = content.substring(0, start) + insertText + content.substring(end);
    setContent(newContent);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (mediaFileInputRef.current) {
      mediaFileInputRef.current.value = '';
    }
    setIsMediaDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {lesson ? 'Edit Lesson' : 'Create New Lesson'}
          </h2>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Lesson
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lesson Settings */}
        <div className="lg:col-span-1">
          <LessonSettings
            title={title}
            setTitle={setTitle}
            quiz={quiz}
            assignment={assignment}
            onEditQuiz={() => setEditingQuiz(true)}
            onEditAssignment={() => setEditingAssignment(true)}
            onRemoveQuiz={() => setQuiz(undefined)}
            onRemoveAssignment={() => setAssignment(undefined)}
            onFileUpload={handleFileUpload}
            fileInputRef={fileInputRef}
          />
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
              <CardDescription>Create engaging lesson content with rich formatting</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentEditor
                content={content}
                setContent={setContent}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                title={title}
                quiz={quiz}
                assignment={assignment}
                onFormatInsert={insertFormatting}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Insert Dialog */}
      <MediaInsertDialog
        isOpen={isMediaDialogOpen}
        onClose={() => setIsMediaDialogOpen(false)}
        mediaType={mediaType}
        onUrlInsert={handleUrlInsert}
        onFileUpload={handleFileUpload}
        mediaFileInputRef={mediaFileInputRef}
      />
    </div>
  );
};

export default LessonEditor;
