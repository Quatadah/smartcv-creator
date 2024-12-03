import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FileText, Plus } from "lucide-react";

const Home = () => {
  // Mock data for saved CVs - in a real app this would come from a database
  const savedCVs = [
    {
      id: 1,
      title: "Software Developer CV",
      lastUpdated: "2 days ago",
      template: "modern"
    },
    {
      id: 2,
      title: "Product Manager CV",
      lastUpdated: "5 days ago",
      template: "minimal"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">
              Create your own custom resume to apply for jobs
            </p>
          </div>
          <Link to="/editor">
            <Button color="primary" className="gap-2">
              <Plus size={20} />
              New Resume
            </Button>
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Resumes</h2>
            <div className="flex gap-2">
              <Button variant="ghost">Draft (2)</Button>
              <Button variant="ghost">Completed (1)</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New CV Card */}
            <Link to="/editor" className="block">
              <div className="border-2 border-dashed rounded-lg p-8 h-[280px] flex flex-col items-center justify-center hover:border-primary transition-colors cursor-pointer">
                <Plus size={40} className="text-muted-foreground mb-4" />
                <span className="text-muted-foreground font-medium">Create Blank Resume</span>
              </div>
            </Link>

            {/* Saved CVs */}
            {savedCVs.map((cv) => (
              <div
                key={cv.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] bg-accent/10 flex items-center justify-center">
                  <FileText size={48} className="text-muted-foreground" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{cv.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last Updated: {cv.lastUpdated}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;