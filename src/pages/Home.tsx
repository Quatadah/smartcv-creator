import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FileText, Plus, Trash2, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Resume {
  id: string;
  title: string;
  template: string;
  updated_at: string;
  content: any;
}

const Home = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      toast.error('Error fetching resumes');
      return;
    }

    setResumes(data || []);
  };

  const deleteResume = async (id: string) => {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Error deleting resume');
      return;
    }

    toast.success('Resume deleted successfully');
    fetchResumes();
  };

  const editResume = (resume: Resume) => {
    navigate('/editor', { state: { resumeData: resume } });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">
              Create and manage your custom resumes
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
          <h2 className="text-xl font-semibold mb-6">My Resumes</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/editor" className="block">
              <div className="border-2 border-dashed rounded-lg p-8 h-[280px] flex flex-col items-center justify-center hover:border-primary transition-colors cursor-pointer">
                <Plus size={40} className="text-muted-foreground mb-4" />
                <span className="text-muted-foreground font-medium">Create New Resume</span>
              </div>
            </Link>

            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] bg-accent/10 flex items-center justify-center relative">
                  <FileText size={48} className="text-muted-foreground" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onClick={(e) => {
                        e.preventDefault();
                        editResume(resume);
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="flat"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteResume(resume.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{resume.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last Updated: {formatDate(resume.updated_at)}
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