import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Globe, Linkedin, Mail, MapPin, Phone, Twitter, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/ui/loader";
import { usePortfolioStore } from "@/store/portfolioStore";
import { SectionType } from "@/types";
import { generatePDF } from '@/utils/pdfGenerator';

const PortfolioView = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentPortfolio, isLoading, error, fetchPortfolioBySlug } = usePortfolioStore();

  useEffect(() => {
    if (slug) {
      fetchPortfolioBySlug(slug);
    }
  }, [slug, fetchPortfolioBySlug]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleDownloadPDF = async () => {
    if (currentPortfolio) {
      await generatePDF(currentPortfolio);
    }
  };

  const renderSection = (section: any) => {
    switch (section.type) {
      case SectionType.ABOUT:
        return renderAboutSection(section);
      case SectionType.EXPERIENCE:
        return renderExperienceSection(section);
      case SectionType.EDUCATION:
        return renderEducationSection(section);
      case SectionType.SKILLS:
        return renderSkillsSection(section);
      case SectionType.PROJECTS:
        return renderProjectsSection(section);
      case SectionType.CONTACT:
        return renderContactSection(section);
      default:
        return null;
    }
  };

  const renderAboutSection = (section: any) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      {section.content.imageUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={section.content.imageUrl}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-primary/20"
          />
        </div>
      )}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>{section.content.text}</p>
      </div>
    </div>
  );

  const renderExperienceSection = (section: any) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      <div className="space-y-8">
        {section.content.map((exp: any) => (
          <div key={exp.id} className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="font-medium">{exp.company}</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(exp.startDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short' })} - 
                  {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short' })}
                </p>
              </div>
              {exp.location && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {exp.location}
                </p>
              )}
              <p className="pt-2">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducationSection = (section: any) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      <div className="space-y-8">
        {section.content.map((edu: any) => (
          <div key={edu.id} className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="font-medium">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(edu.startDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short' })} - 
                  {edu.current ? ' Present' : new Date(edu.endDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short' })}
                </p>
              </div>
              {edu.location && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {edu.location}
                </p>
              )}
              {edu.field && <p className="text-muted-foreground">{edu.field}</p>}
              {edu.description && <p className="pt-2">{edu.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsSection = (section: any) => {
    const skillsByCategory = section.content.reduce((groups: any, skill: any) => {
      const category = skill.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(skill);
      return groups;
    }, {});

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillsByCategory).map(([category, skills]: [string, any]) => (
            <Card key={category} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: any) => (
                    <div
                      key={skill.id}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill.name} {skill.level && `• ${skill.level}/5`}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderProjectsSection = (section: any) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.content.map((project: any) => (
          <Card key={project.id} className="overflow-hidden h-full flex flex-col">
            {project.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardContent className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Repository
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContactSection = (section: any) => {
    const { email, phone, website, location, socialLinks } = section.content;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium mb-2">Contact Information</h3>
              {email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                </div>
              )}
              {phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
                </div>
              )}
              {location && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {website}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {socialLinks && socialLinks.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Connect with Me</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link: any, index: number) => {
                    const SocialIcon = getSocialIcon(link.platform);
                    return (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {SocialIcon && <SocialIcon className="h-4 w-4 mr-2" />}
                          {link.platform}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  const getSocialIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('github')) return Github;
    if (lowerPlatform.includes('linkedin')) return Linkedin;
    if (lowerPlatform.includes('twitter')) return Twitter;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (error || !currentPortfolio || !currentPortfolio.isPublic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The portfolio you're looking for doesn't exist or is set to private.
          </p>
          <Button onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Portfolio Header */}
        <section className="bg-gradient-to-br from-portfolio-blue-600 to-portfolio-blue-900 text-white py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" className="text-white" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button variant="outline" className="text-white" onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                {currentPortfolio.title}
              </motion.h1>
              {currentPortfolio.summary && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-100"
                >
                  {currentPortfolio.summary}
                </motion.p>
              )}
            </div>
          </div>
        </section>
        
        <div id="portfolio-content">
          {/* Portfolio Content */}
          <section className="py-12">
            <div className="container">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
              >
                {currentPortfolio.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <motion.div key={section.id} variants={itemVariants}>
                      {renderSection(section)}
                      <Separator className="mt-12" />
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioView;
