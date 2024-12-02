import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const [authDialog, setAuthDialog] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signin'
  });
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "AI-Powered",
      description: "Smart suggestions and auto-formatting for professional results"
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Multiple Templates",
      description: "Choose from various professional templates"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "ATS-Friendly",
      description: "Optimized for Applicant Tracking Systems"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold">SmartCV</span>
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/editor">
                <Button>Go to Editor</Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setAuthDialog({ isOpen: true, mode: 'signin' })}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setAuthDialog({ isOpen: true, mode: 'signup' })}
                >
                  Sign Up
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-up">
              Create Your Professional CV with
              <span className="text-primary block">AI-Powered Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up">
              Build stunning, ATS-friendly resumes in minutes. Let AI help you showcase
              your skills and experience in the best possible way.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up">
            {isAuthenticated ? (
              <Link to="/editor">
                <Button size="lg" className="gap-2">
                  Create Your CV <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => setAuthDialog({ isOpen: true, mode: 'signup' })}
                className="gap-2"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SmartCV?</h2>
            <p className="text-muted-foreground">
              Everything you need to create a standout resume
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <AuthDialog
        isOpen={authDialog.isOpen}
        mode={authDialog.mode}
        onClose={() => setAuthDialog({ ...authDialog, isOpen: false })}
      />
    </div>
  );
};

export default Index;