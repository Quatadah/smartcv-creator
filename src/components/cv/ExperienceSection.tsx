import { Card, Button, Input, Textarea, DateRangePicker } from "@nextui-org/react";
import { Experience } from "@/types/cv";
import { AIAssistant } from "./AIAssistant";

interface ExperienceSectionProps {
  experience: Experience[];
  onUpdate: (index: number, field: keyof Experience, value: string) => void;
  onAdd: () => void;
}

export function ExperienceSection({ experience, onUpdate, onAdd }: ExperienceSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
      {experience.map((exp, index) => (
        <div key={index} className="mb-6">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4">
            <Input
              type="text"
              label="Job Title"
              placeholder="Enter job title"
              value={exp.title}
              onChange={(e) => onUpdate(index, "title", e.target.value)}
              className="max-w-full"
            />
            <Input
              type="text"
              label="Company"
              placeholder="Enter company name"
              value={exp.company}
              onChange={(e) => onUpdate(index, "company", e.target.value)}
              className="max-w-full"
            />
          </div>
          <div className="mb-4">
            <DateRangePicker 
              label="Employment Period" 
              className="max-w-full"
              value={{
                start: exp.startDate,
                end: exp.endDate
              }}
              onChange={(dates) => {
                if (dates?.start) {
                  onUpdate(index, "startDate", dates.start);
                }
                if (dates?.end) {
                  onUpdate(index, "endDate", dates.end);
                }
              }}
            />
          </div>
          <Textarea
            label="Description"
            placeholder="Enter job description"
            value={exp.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            className="max-w-full"
            minRows={3}
          />
          <AIAssistant
            section="experience"
            currentContent={exp.description}
            onSuggestionApply={(suggestion) =>
              onUpdate(index, "description", suggestion)
            }
          />
        </div>
      ))}
      <Button onClick={onAdd} className="w-full">
        Add Experience
      </Button>
    </Card>
  );
}