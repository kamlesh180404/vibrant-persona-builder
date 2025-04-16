
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuthStore } from "@/store/authStore";
import { usePortfolioStore } from "@/store/portfolioStore";
import { SectionType } from "@/types";

// Form validation schema
const portfolioSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  summary: z.string().max(500, { message: "Summary must be less than 500 characters" }).optional(),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .max(50, { message: "Slug must be less than 50 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" })
    .optional(),
  isPublic: z.boolean().default(false),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const PortfolioCreate = () => {
  const { user } = useAuthStore();
  const { createPortfolio, isLoading } = usePortfolioStore();
  const navigate = useNavigate();
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: "",
      summary: "",
      slug: "",
      isPublic: false,
    },
  });
  
  // Watch the title to generate the slug
  const title = form.watch("title");
  const slug = form.watch("slug");
  
  // Auto-generate slug when title changes (if the user hasn't edited the slug manually)
  if (title && !isSlugEdited && !slug) {
    const generatedSlug = generateSlug(title);
    form.setValue("slug", generatedSlug);
  }
  
  const onSubmit = async (data: PortfolioFormValues) => {
    if (!user) return;
    
    try {
      // Ensure slug exists
      if (!data.slug) {
        data.slug = generateSlug(data.title);
      }
      
      const portfolio = await createPortfolio({
        userId: user.id,
        title: data.title,
        summary: data.summary || "",
        slug: data.slug,
        isPublic: data.isPublic,
        theme: "default", // Default theme
        sections: [
          // Create default About Me section
          {
            id: `section-${Date.now()}`,
            portfolioId: "", // Will be set by the API
            type: SectionType.ABOUT,
            title: "About Me",
            order: 1,
            content: {
              text: "Welcome to my portfolio! I'm excited to share my work and experience with you.",
            },
          },
        ],
      });
      
      // Navigate to the edit page for the new portfolio
      navigate(`/portfolio/edit/${portfolio.id}`);
    } catch (error) {
      console.error("Failed to create portfolio:", error);
    }
  };
  
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
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Create New Portfolio</h1>
              <p className="text-muted-foreground mt-1">
                Set up the basic details for your new portfolio
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Information</CardTitle>
              <CardDescription>
                Provide the essential details for your portfolio. You can add more sections later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Doe - Web Developer" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be the main title displayed on your portfolio.
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
                            placeholder="A brief overview of your portfolio..."
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>
                          A short description of your portfolio that will appear in previews.
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
                            <Input 
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => {
                                field.onChange(e);
                                setIsSlugEdited(true);
                              }}
                              placeholder="your-custom-url"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Create a custom URL for your portfolio. Use only lowercase letters, numbers, and hyphens.
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
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Create Portfolio
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioCreate;
