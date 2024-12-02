import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Experience } from "@/types/cv";
import { AIAssistant } from "./AIAssistant";
import { Input, Textarea } from "@nextui-org/react";
import { RangeCalendar } from "@nextui-org/calendar";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";

interface ExperienceSectionProps {
  experience: Experience[];
  onUpdate: (index: number, field: keyof Experience, value: string) => void;
  onAdd: () => void;
}

export function ExperienceSection({ experience, onUpdate, onAdd }: ExperienceSectionProps) {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
      {experience.map((exp, index) => (
        <div key={index} className="mb-6 space-y-4">
          <Input
            label="Job Title"
            value={exp.title}
            onChange={(e) => onUpdate(index, "title", e.target.value)}
            variant="bordered"
            className="max-w-full"
          />
          <Input
            label="Company"
            value={exp.company}
            onChange={(e) => onUpdate(index, "company", e.target.value)}
            variant="bordered"
            className="max-w-full"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="month"
              label="Start Date"
              value={exp.startDate}
              onChange={(e) => onUpdate(index, "startDate", e.target.value)}
              variant="bordered"
              className="max-w-full"
            />
            <Input
              type="month"
              label="End Date"
              value={exp.endDate}
              onChange={(e) => onUpdate(index, "endDate", e.target.value)}
              variant="bordered"
              className="max-w-full"
            />
          </div>
          <Textarea
            label="Description"
            value={exp.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            variant="bordered"
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
      <Button onClick={onAdd} variant="outline" className="w-full">
        Add Experience
      </Button>
    </Card>
  );
}