import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Education } from "@/types/cv";
import { Input, Textarea } from "@nextui-org/react";

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
          <Input
            label="Degree"
            value={edu.degree}
            onChange={(e) => onUpdate(index, "degree", e.target.value)}
            variant="bordered"
            className="max-w-full"
          />
          <Input
            label="Institution"
            value={edu.institution}
            onChange={(e) => onUpdate(index, "institution", e.target.value)}
            variant="bordered"
            className="max-w-full"
          />
          <Input
            label="Year"
            value={edu.year}
            onChange={(e) => onUpdate(index, "year", e.target.value)}
            variant="bordered"
            className="max-w-full"
          />
          <Textarea
            label="Description"
            value={edu.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            variant="bordered"
            className="max-w-full"
            minRows={3}
          />
        </div>
      ))}
      <Button onClick={onAdd} variant="outline" className="w-full">
        Add Education
      </Button>
    </Card>
  );
}