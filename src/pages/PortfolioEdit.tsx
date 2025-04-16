
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChevronDown, ChevronUp, Eye, Grip, Loader2, Plus, Save, Settings, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePortfolioStore } from "@/store/portfolioStore";
import { PortfolioSection, SectionType } from "@/types";

// Import needed for react-beautiful-dnd
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form validation schema for portfolio settings
const portfolioSettingsSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  summary: z.string().max(500, { message: "Summary must be less than 500 characters" }).optional(),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .max(50, { message: "Slug must be less than 50 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" }),
  isPublic: z.boolean().default(false),
  theme: z.string().default("default"),
});

type PortfolioSettingsFormValues = z.infer<typeof portfolioSettingsSchema>;

// Placeholder component for the actual editor - in a real app, this would be more complex
const SectionEditor = ({ section, onUpdate, onDelete }: { 
  section: PortfolioSection; 
  onUpdate: (id: string, updates: Partial<PortfolioSection>) => void;
  onDelete: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(section.title);
  
  const updateTitle = () => {
    onUpdate(section.id, { title });
  };
  
  const getSectionIcon = (type: SectionType) => {
    switch (type) {
      case SectionType.ABOUT:
        return "👋";
      case SectionType.EXPERIENCE:
        return "💼";
      case SectionType.EDUCATION:
        return "🎓";
      case SectionType.SKILLS:
        return "🛠️";
      case SectionType.PROJECTS:
        return "🚀";
      case SectionType.CONTACT:
        return "📧";
      default:
        return "📄";
    }
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getSectionIcon(section.type)}</span>
            <div>
              <div className="font-medium">{section.title}</div>
              <div className="text-xs text-muted-foreground">{section.type}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {expanded && (
        <>
          <CardContent className="px-4 py-3 border-t">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Title</label>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  onBlur={updateTitle}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground">
                  Section content editor would go here, specific to each section type
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-4 py-3 flex justify-between">
            <Button variant="outline" size="sm" onClick={() => onDelete(section.id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Section
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

const AddSectionButton = ({ onAdd }: { onAdd: (type: SectionType) => void }) => {
  const [open, setOpen] = useState(false);
  
  const sectionTypes = [
    { type: SectionType.ABOUT, label: "About Me", description: "Introduce yourself to visitors" },
    { type: SectionType.EXPERIENCE, label: "Experience", description: "Display your work history and roles" },
    { type: SectionType.EDUCATION, label: "Education", description: "Show your educational background" },
    { type: SectionType.SKILLS, label: "Skills", description: "Highlight your technical and soft skills" },
    { type: SectionType.PROJECTS, label: "Projects", description: "Showcase your notable projects" },
    { type: SectionType.CONTACT, label: "Contact", description: "Add contact information and social links" },
  ];
  
  return (
    <div className="my-6">
      {open ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Section</CardTitle>
            <CardDescription>Select the type of section you want to add</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectionTypes.map((section) => (
              <Card 
                key={section.type} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  onAdd(section.type);
                  setOpen(false);
                }}
              >
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    {section.label}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {section.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="border-t justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={() => setOpen(true)} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add New Section
        </Button>
      )}
    </div>
  );
};

const PortfolioEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    currentPortfolio, 
    isLoading, 
    error, 
    fetchPortfolioById, 
    updatePortfolio, 
    addSection, 
    updateSection, 
    removeSection,
    reorderSections 
  } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState("editor");
  const [isSaving, setIsSaving] = useState(false);
  
  // For settings form
  const form = useForm<PortfolioSettingsFormValues>({
    resolver: zodResolver(portfolioSettingsSchema),
    defaultValues: {
      title: "",
      summary: "",
      slug: "",
      isPublic: false,
      theme: "default",
    },
  });
  
  // Fetch portfolio data
  useEffect(() => {
    if (id) {
      fetchPortfolioById(id);
    }
  }, [id, fetchPortfolioById]);
  
  // Update form when portfolio data is loaded
  useEffect(() => {
    if (currentPortfolio) {
      form.reset({
        title: currentPortfolio.title,
        summary: currentPortfolio.summary,
        slug: currentPortfolio.slug,
        isPublic: currentPortfolio.isPublic,
        theme: currentPortfolio.theme,
      });
    }
  }, [currentPortfolio, form]);
  
  const handleAddSection = (type: SectionType) => {
    // Determine the next order number
    const nextOrder = currentPortfolio?.sections.length 
      ? Math.max(...currentPortfolio.sections.map(s => s.order)) + 1
      : 1;
    
    // Default titles for each section type
    const titleMap: Record<SectionType, string> = {
      [SectionType.ABOUT]: "About Me",
      [SectionType.EXPERIENCE]: "Work Experience",
      [SectionType.EDUCATION]: "Education",
      [SectionType.SKILLS]: "Skills",
      [SectionType.PROJECTS]: "Projects",
      [SectionType.CONTACT]: "Contact Information",
    };
    
    // Initialize default content based on section type
    let defaultContent: any = {};
    switch (type) {
      case SectionType.ABOUT:
        defaultContent = { text: "Tell visitors about yourself..." };
        break;
      case SectionType.EXPERIENCE:
        defaultContent = [];
        break;
      case SectionType.EDUCATION:
        defaultContent = [];
        break;
      case SectionType.SKILLS:
        defaultContent = [];
        break;
      case SectionType.PROJECTS:
        defaultContent = [];
        break;
      case SectionType.CONTACT:
        defaultContent = { 
          email: "", 
          phone: "", 
          location: "", 
          socialLinks: [] 
        };
        break;
    }
    
    addSection({
      type,
      title: titleMap[type],
      order: nextOrder,
      content: defaultContent,
    });
  };
  
  const onDragEnd = (result: any) => {
    if (!result.destination || !currentPortfolio) return;
    
    const items = Array.from(currentPortfolio.sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Get the updated section IDs in the correct order
    const orderedIds = items.map(section => section.id);
    
    // Update the store with the new order
    reorderSections(orderedIds);
  };
  
  const handleUpdateSettings = async (data: PortfolioSettingsFormValues) => {
    if (!currentPortfolio || !id) return;
    
    setIsSaving(true);
    try {
      await updatePortfolio(id, {
        title: data.title,
        summary: data.summary || "",
        slug: data.slug,
        isPublic: data.isPublic,
        theme: data.theme,
      });
      setActiveTab("editor"); // Switch back to editor tab after saving
    } catch (error) {
      console.error("Failed to update portfolio settings:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePreview = () => {
    if (currentPortfolio) {
      window.open(`/portfolio/${currentPortfolio.slug}`, '_blank');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  
  if (error || !currentPortfolio) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Error Loading Portfolio</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't load the portfolio you're looking for. It may have been deleted or you don't have permission to view it.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{currentPortfolio.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-2 w-2 rounded-full ${currentPortfolio.isPublic ? 'bg-green-500' : 'bg-orange-500'}`} />
                <span className="text-sm text-muted-foreground">
                  {currentPortfolio.isPublic ? 'Public' : 'Private'} ·
                </span>
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date(currentPortfolio.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex mt-4 md:mt-0 gap-2">
              <Button variant="outline" onClick={handlePreview} disabled={!currentPortfolio.isPublic}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="editor">
                Sections Editor
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Portfolio Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-6">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {currentPortfolio.sections
                        .sort((a, b) => a.order - b.order)
                        .map((section, index) => (
                          <Draggable
                            key={section.id}
                            draggableId={section.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="relative"
                              >
                                <div 
                                  {...provided.dragHandleProps}
                                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 p-2 cursor-move opacity-50 hover:opacity-100"
                                >
                                  <Grip className="h-4 w-4" />
                                </div>
                                <SectionEditor 
                                  section={section}
                                  onUpdate={updateSection}
                                  onDelete={removeSection}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <AddSectionButton onAdd={handleAddSection} />
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Settings</CardTitle>
                  <CardDescription>
                    Configure the general settings for your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdateSettings)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              The main title displayed on your portfolio.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormDescription>
                              A brief description of your portfolio.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom URL</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <span className="text-muted-foreground mr-2">/portfolio/</span>
                                <Input {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>
                              The unique URL for your portfolio.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Theme</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a theme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="minimal">Minimal</SelectItem>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="creative">Creative</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the visual style for your portfolio.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isPublic"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Public Portfolio</FormLabel>
                              <FormDescription>
                                When enabled, your portfolio will be visible to anyone with the link.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end space-x-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("editor")}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Settings
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioEdit;
