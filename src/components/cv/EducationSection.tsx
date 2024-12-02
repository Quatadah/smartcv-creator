import { Card, Button, Input, Textarea, DateRangePicker } from "@nextui-org/react";
import { Education } from "@/types/cv";

interface EducationSectionProps {
  education: Education[];
  onUpdate: (index: number, field: keyof Education, value: string) => void;
  onAdd: () => void;
}

export function EducationSection({ education, onUpdate, onAdd }: EducationSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-6">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4">
            <Input
              type="text"
              label="Degree"
              placeholder="Enter your degree"
              value={edu.degree}
              onChange={(e) => onUpdate(index, "degree", e.target.value)}
              className="max-w-full"
            />
            <Input
              type="text"
              label="Institution"
              placeholder="Enter institution name"
              value={edu.institution}
              onChange={(e) => onUpdate(index, "institution", e.target.value)}
              className="max-w-full"
            />
          </div>
          <div className="mb-4">
            <DateRangePicker 
              label="Study Period" 
              className="max-w-full"
              value={{
                start: edu.year ? new Date(edu.year) : null,
                end: edu.year ? new Date(edu.year) : null // Since education typically uses just one year, we'll use it for both
              }}
              onChange={(dates) => {
                if (dates?.end) {
                  onUpdate(index, "year", dates.end.toISOString());
                }
              }}
            />
          </div>
          <Textarea
            label="Description"
            placeholder="Enter description"
            value={edu.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            className="max-w-full"
            minRows={3}
          />
        </div>
      ))}
      <Button onClick={onAdd} className="w-full">
        Add Education
      </Button>
    </Card>
  );
}