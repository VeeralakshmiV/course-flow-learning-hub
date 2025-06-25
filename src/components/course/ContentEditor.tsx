
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye } from "lucide-react";
import { Quiz, Assignment } from "@/stores/courseStore";
import ContentToolbar from "./ContentToolbar";

interface ContentEditorProps {
  content: string;
  setContent: (content: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title: string;
  quiz?: Quiz;
  assignment?: Assignment;
  onFormatInsert: (format: string) => void;
}

const ContentEditor = ({
  content,
  setContent,
  activeTab,
  setActiveTab,
  title,
  quiz,
  assignment,
  onFormatInsert
}: ContentEditorProps) => {
  const renderPreview = () => {
    let preview = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '• $1')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      .replace(/\n/g, '<br>');

    return { __html: preview };
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="edit" className="space-y-4">
        <ContentToolbar onFormatInsert={onFormatInsert} />

        <Textarea
          id="lesson-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your lesson content here. Use the toolbar buttons to add media..."
          className="min-h-[400px] resize-none"
        />

        <div className="text-sm text-gray-500 space-y-2">
          <p>💡 Use the toolbar buttons to insert images, videos, PDFs, and links into your content.</p>
          <p>📁 Upload files directly using the "Quick Upload" button or choose URL/Upload in the media dialogs.</p>
          <p>🎯 Add interactive content with quizzes and assignments to engage your students.</p>
        </div>
      </TabsContent>

      <TabsContent value="preview">
        <div className="min-h-[400px] p-4 border rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-4">{title || "Lesson Preview"}</h3>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={renderPreview()}
          />
          
          {/* Preview interactive content */}
          {(quiz || assignment) && (
            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-semibold">Interactive Content</h4>
              {quiz && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900">📝 Quiz: {quiz.title}</h5>
                  <p className="text-sm text-blue-700">{quiz.questions.length} questions</p>
                </div>
              )}
              {assignment && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-green-900">📋 Assignment: {assignment.title}</h5>
                  <p className="text-sm text-green-700">{assignment.maxPoints} points</p>
                </div>
              )}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ContentEditor;
