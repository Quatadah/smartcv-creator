import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, FileText, Download, Layout } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-up">
          <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium">
            Create Your Professional CV
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-secondary">
            Craft Your Perfect Resume
            <br />
            <span className="text-primary">Powered by AI</span>
          </h1>
          <p className="text-lg text-secondary/60 max-w-2xl mx-auto">
            Create stunning, professional CVs in minutes with our AI-powered platform.
            Choose from beautiful templates and get expert suggestions for your industry.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/editor">
              <Button size="lg" className="button-hover">
                Create Your CV <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="button-hover">
              View Templates
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          <Card className="glass-card p-6 hover-scale">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Templates</h3>
            <p className="text-secondary/60">
              Choose from professionally designed templates optimized for your industry
            </p>
          </Card>
          <Card className="glass-card p-6 hover-scale">
            <Layout className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
            <p className="text-secondary/60">
              Get intelligent suggestions for your experience and skills
            </p>
          </Card>
          <Card className="glass-card p-6 hover-scale">
            <Download className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
            <p className="text-secondary/60">
              Download your CV in multiple formats or share directly
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;