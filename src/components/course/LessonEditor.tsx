
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, X, Bold, Italic, List, Link, Image, Eye, Edit } from "lucide-react";
import { Lesson } from "@/stores/courseStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LessonEditorProps {
  lesson?: Lesson;
  onSave: (lesson: Omit<Lesson, 'id'>) => void;
  onClose: () => void;
}

const LessonEditor = ({ lesson, onSave, onClose }: LessonEditorProps) => {
  const [title, setTitle] = useState(lesson?.title || "");
  const [content, setContent] = useState(lesson?.content || "");
  const [activeTab, setActiveTab] = useState("edit");

  const handleSave = () => {
    onSave({
      title,
      content,
    });
  };

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
        newText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'image':
        newText = `![${selectedText || 'alt text'}](image-url)`;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const renderPreview = () => {
    // Simple markdown-like preview
    let preview = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '• $1')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg" />')
      .replace(/\n/g, '<br>');

    return { __html: preview };
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
          <Card>
            <CardHeader>
              <CardTitle>Lesson Settings</CardTitle>
              <CardDescription>Configure lesson properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Lesson Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter lesson title"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lesson titles are displayed publicly wherever required.
                </p>
              </div>
              <div className="pt-4">
                <Badge variant="secondary" className="mb-2">
                  WP Editor
                </Badge>
                <Button size="sm" variant="outline" className="w-full">
                  Add Media
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
              <CardDescription>Create engaging lesson content with rich formatting</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="edit" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Visual
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Text
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="edit" className="space-y-4">
                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                    <select className="text-sm border rounded px-2 py-1">
                      <option>Paragraph</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                    </select>
                    <div className="w-px h-6 bg-gray-300 mx-2" />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => insertFormatting('bold')}
                      className="p-2"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => insertFormatting('italic')}
                      className="p-2"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-2" />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => insertFormatting('list')}
                      className="p-2"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => insertFormatting('link')}
                      className="p-2"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => insertFormatting('image')}
                      className="p-2"
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                    <div className="ml-auto">
                      <select className="text-sm border rounded px-2 py-1">
                        <option>Tutor ShortCode</option>
                      </select>
                    </div>
                  </div>

                  <Textarea
                    id="lesson-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your lesson content here..."
                    className="min-h-[400px] resize-none"
                  />

                  <div className="text-sm text-gray-500">
                    💡 The idea of a summary is a short text to prepare students for the activities within the
                    topic or week. The text is shown on the course page under the topic name.
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="min-h-[400px] p-4 border rounded-lg bg-white">
                    <h3 className="text-xl font-semibold mb-4">{title || "Lesson Preview"}</h3>
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={renderPreview()}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonEditor;
