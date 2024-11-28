import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Experience } from "@/types/cv";
import { AIAssistant } from "./AIAssistant";

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
          <div>
            <Label>Job Title</Label>
            <Input
              value={exp.title}
              onChange={(e) => onUpdate(index, "title", e.target.value)}
            />
          </div>
          <div>
            <Label>Company</Label>
            <Input
              value={exp.company}
              onChange={(e) => onUpdate(index, "company", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => onUpdate(index, "startDate", e.target.value)}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => onUpdate(index, "endDate", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => onUpdate(index, "description", e.target.value)}
            />
            <AIAssistant
              section="experience"
              currentContent={exp.description}
              onSuggestionApply={(suggestion) =>
                onUpdate(index, "description", suggestion)
              }
            />
          </div>
        </div>
      ))}
      <Button onClick={onAdd} variant="outline" className="w-full">
        Add Experience
      </Button>
    </Card>
  );
}