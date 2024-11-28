import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Education } from "@/types/cv";

interface EducationSectionProps {
  education: Education[];
  onUpdate: (index: number, field: keyof Education, value: string) => void;
  onAdd: () => void;
}

export function EducationSection({ education, onUpdate, onAdd }: EducationSectionProps) {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-6 space-y-4">
          <div>
            <Label>Degree</Label>
            <Input
              value={edu.degree}
              onChange={(e) => onUpdate(index, "degree", e.target.value)}
            />
          </div>
          <div>
            <Label>Institution</Label>
            <Input
              value={edu.institution}
              onChange={(e) => onUpdate(index, "institution", e.target.value)}
            />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              value={edu.year}
              onChange={(e) => onUpdate(index, "year", e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={edu.description}
              onChange={(e) => onUpdate(index, "description", e.target.value)}
            />
          </div>
        </div>
      ))}
      <Button onClick={onAdd} variant="outline" className="w-full">
        Add Education
      </Button>
    </Card>
  );
}