import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Editor = () => {
  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="button-hover">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <Button className="button-hover">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6 animate-fade-up">
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" className="mt-1" />
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
              <textarea
                className="w-full h-32 p-3 rounded-md border focus:ring-2 focus:ring-primary"
                placeholder="Write a brief professional summary..."
              />
            </Card>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
            <div className="border-t pt-4">
              <p className="text-sm text-secondary/60">
                Your CV preview will appear here as you type...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;