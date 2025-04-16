
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, FileEdit, Layout, Share2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuthStore } from "@/store/authStore";

const HomePage = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-portfolio-blue-600 to-portfolio-blue-900 text-white py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  Showcase Your Professional Journey
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">
                  Create stunning digital portfolios to highlight your skills, projects, and experience. Stand out to employers and clients with a personalized online presence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {isAuthenticated ? (
                    <Button size="lg" asChild>
                      <Link to="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                  ) : (
                    <>
                      <Button size="lg" asChild>
                        <Link to="/register">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
                      </Button>
                      <Button variant="outline" size="lg" className="bg-white/10" asChild>
                        <Link to="/login">Log In</Link>
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="hidden md:block"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur-lg opacity-50"></div>
                  <div className="relative glass-card p-6 rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400&q=80" 
                      alt="Portfolio example" 
                      className="w-full h-auto rounded-md shadow-md" 
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Perfect Portfolio</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Powerful features to help you build a professional digital presence that stands out.
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <motion.div variants={itemVariants} className="portfolio-section hover-scale">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FileEdit className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Customizable Sections</h3>
                </div>
                <p className="text-muted-foreground">
                  Create personalized sections for your experience, projects, skills, education, and more.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="portfolio-section hover-scale">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Layout className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Modern Design</h3>
                </div>
                <p className="text-muted-foreground">
                  Choose from various themes and layouts to match your personal style and professional brand.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="portfolio-section hover-scale">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Easy Sharing</h3>
                </div>
                <p className="text-muted-foreground">
                  Get a dedicated portfolio URL to share with employers, clients, and your network.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="portfolio-section hover-scale">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Professional Projects</h3>
                </div>
                <p className="text-muted-foreground">
                  Showcase your work with beautiful project cards including images, descriptions, and links.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="portfolio-section hover-scale">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Social Integration</h3>
                </div>
                <p className="text-muted-foreground">
                  Connect your social profiles to help visitors discover more about your online presence.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="portfolio-section hover-scale">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <div className="relative">
                      <span className="absolute -inset-1 rounded-full bg-primary/20 blur-sm"></span>
                      <span className="relative block h-6 w-6 text-primary font-bold text-center">
                        ⚡
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">Responsive Design</h3>
                </div>
                <p className="text-muted-foreground">
                  Your portfolio looks great on any device, from desktops to mobile phones.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-portfolio-blue-100 dark:bg-portfolio-blue-900/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to Create Your Digital Portfolio?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Join thousands of professionals who have enhanced their online presence with our platform.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {isAuthenticated ? (
                  <Button size="lg" asChild>
                    <Link to="/dashboard">View Your Dashboard</Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <Link to="/register">Start Building for Free</Link>
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
