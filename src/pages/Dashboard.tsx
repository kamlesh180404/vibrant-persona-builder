
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, Eye, FilePlus, Loader2, MoreHorizontal, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuthStore } from "@/store/authStore";
import { usePortfolioStore } from "@/store/portfolioStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { portfolios, isLoading, error, fetchUserPortfolios } = usePortfolioStore();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserPortfolios(user.id);
    }
  }, [user, fetchUserPortfolios]);

  const handleDeletePortfolio = async (id: string) => {
    // In a real app, you would call the delete function from the store
    // and handle confirmation dialogs
    setIsDeleting(id);
    setTimeout(() => {
      setIsDeleting(null);
    }, 1000);
  };

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
      
      <main className="flex-grow container py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolios and profile
            </p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <Link to="/portfolio/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New Portfolio
            </Link>
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Portfolios</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card>
                <CardContent className="p-6">
                  <div className="text-destructive text-center">
                    <p>Error loading portfolios. Please try again.</p>
                  </div>
                </CardContent>
              </Card>
            ) : portfolios.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12 gap-4">
                  <FilePlus className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-xl font-semibold">No portfolios yet</h3>
                  <p className="text-center text-muted-foreground mb-4">
                    Create your first portfolio to showcase your work and experience
                  </p>
                  <Button asChild>
                    <Link to="/portfolio/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Portfolio
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {portfolios.map((portfolio) => (
                  <motion.div key={portfolio.id} variants={itemVariants}>
                    <Card className="hover:shadow-md transition-shadow overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="truncate">{portfolio.title}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="sr-only">Portfolio menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/portfolio/edit/${portfolio.id}`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/portfolio/${portfolio.slug}`} className="flex items-center">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeletePortfolio(portfolio.id)}
                              >
                                {isDeleting === portfolio.id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="mr-2 h-4 w-4" />
                                )}
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription className="truncate">
                          {portfolio.summary || "No summary provided"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground mb-3">
                          {portfolio.sections.length} section{portfolio.sections.length !== 1 ? 's' : ''}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <div className={`h-2 w-2 rounded-full ${portfolio.isPublic ? 'bg-green-500' : 'bg-orange-500'}`} />
                          <span>
                            {portfolio.isPublic ? 'Public' : 'Private'}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/50 px-6 py-3">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs text-muted-foreground">
                            Created: {new Date(portfolio.createdAt).toLocaleDateString()}
                          </span>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/portfolio/edit/${portfolio.id}`}>Edit</Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
