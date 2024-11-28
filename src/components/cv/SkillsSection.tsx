import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AIAssistant } from "./AIAssistant";

interface SkillsSectionProps {
  skills: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
}

export function SkillsSection({ skills, onUpdate, onAdd }: SkillsSectionProps) {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      {skills.map((skill, index) => (
        <div key={index} className="mb-4">
          <Input
            value={skill}
            onChange={(e) => onUpdate(index, e.target.value)}
            placeholder="Enter a skill"
          />
        </div>
      ))}
      <AIAssistant
        section="skills"
        currentContent={skills.join(", ")}
        onSuggestionApply={(suggestion) => {
          const newSkills = suggestion
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          newSkills.forEach((skill) => onAdd());
          newSkills.forEach((skill, index) => onUpdate(skills.length + index, skill));
        }}
      />
      <Button onClick={onAdd} variant="outline" className="w-full mt-4">
        Add Skill
      </Button>
    </Card>
  );
}