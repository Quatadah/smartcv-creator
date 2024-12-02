import { Card } from "@nextui-org/react";
import { Button, Input, Textarea, DateRangePicker } from "@nextui-org/react";
import { Experience } from "@/types/cv";
import { AIAssistant } from "./AIAssistant";
import { today, getLocalTimeZone, parseDate, CalendarDate } from '@internationalized/date';

interface ExperienceSectionProps {
  experience: Experience[];
  onUpdate: (index: number, field: keyof Experience, value: string | { start: string; end: string }) => void;
  onAdd: () => void;
}

export function ExperienceSection({ experience, onUpdate, onAdd }: ExperienceSectionProps) {
  const formatDate = (date: CalendarDate) => {
    return date.toString();
  };

  const handleDateRangeChange = (index: number, range: { start: CalendarDate; end: CalendarDate }) => {
    onUpdate(index, "dateRange", {
      start: formatDate(range.start),
      end: formatDate(range.end)
    });
    // Also update the legacy date fields for backward compatibility
    onUpdate(index, "startDate", formatDate(range.start));
    onUpdate(index, "endDate", formatDate(range.end));
  };

  return (
    <Card className="glass-card p-6">
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
              value={exp.dateRange ? {
                start: parseDate(exp.dateRange.start),
                end: parseDate(exp.dateRange.end)
              } : {
                start: today(getLocalTimeZone()),
                end: today(getLocalTimeZone())
              }}
              onChange={(range) => handleDateRangeChange(index, range)}
              className="max-w-full"
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