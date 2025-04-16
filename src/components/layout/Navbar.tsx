
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Moon, Sun, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Portfolio</span>Builder
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/portfolio/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Portfolio
                  </Link>
                </Button>
                <ThemeToggle />
                <div className="relative group">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-card border border-border hidden group-hover:block">
                    <div className="px-4 py-2 text-sm border-b border-border">
                      <div className="font-medium truncate">{user?.username}</div>
                      <div className="text-muted-foreground truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                Login
              </Link>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
              <ThemeToggle />
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={closeMenu}
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/portfolio/new" 
                    className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                    onClick={closeMenu}
                  >
                    <Plus className="inline mr-2 h-4 w-4" />
                    New Portfolio
                  </Link>
                  <div className="border-t border-border my-2" />
                  <div className="p-2">
                    <div className="font-medium">{user?.username}</div>
                    <div className="text-muted-foreground text-sm">{user?.email}</div>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center text-sm font-medium"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                    <ThemeToggle />
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-primary text-primary-foreground text-sm font-medium p-2 rounded-md text-center"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                  <div className="flex justify-end p-2">
                    <ThemeToggle />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
