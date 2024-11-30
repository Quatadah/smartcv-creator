import { Card } from "@/components/ui/card";
import {Button } from "@nextui-org/button";
import { ChevronRight, FileText, Download, Layout, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold">SmartCV</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-16 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-up">
          <div className="space-y-2">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Create Your Professional CV
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Craft Your Perfect Resume
              <br />
              <span className="text-primary">Powered by AI</span>
            </h1>
          </div>
          <p className="text-lg max-w-2xl mx-auto">
            Create stunning, professional CVs in minutes with our AI-powered platform.
            Choose from beautiful templates and get expert suggestions for your industry.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/editor">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                Create Your CV <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button color="primary" size="lg" className="shadow hover:shadow-lg transition-all">
              View Templates
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-all bg-card hover:scale-105">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Templates</h3>
            <p className="">
              Choose from professionally designed templates optimized for your industry
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-all bg-card hover:scale-105">
            <Layout className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
            <p className="">
              Get intelligent suggestions for your experience and skills
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-all bg-card hover:scale-105">
            <Download className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
            <p className="">
              Download your CV in multiple formats with one click
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;