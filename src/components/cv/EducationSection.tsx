import { Card } from "@nextui-org/react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Education } from "@/types/cv";
import { DateRangePicker } from "@nextui-org/react";
import { parseISO } from "date-fns";

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
            <Input
              type="date"
              label="Year"
              placeholder="Select graduation year"
              value={edu.year}
              onChange={(e) => onUpdate(index, "year", e.target.value)}
              className="max-w-full"
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