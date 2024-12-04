import { Card, Input, Button, Select, SelectItem } from "@nextui-org/react";
import { Language } from "@/types/cv";

interface LanguagesSectionProps {
  languages: Language[];
  onUpdate: (index: number, field: keyof Language, value: string) => void;
  onAdd: () => void;
}

export function LanguagesSection({ languages, onUpdate, onAdd }: LanguagesSectionProps) {
  const proficiencyLevels = [
    "Native",
    "Fluent",
    "Advanced",
    "Intermediate",
    "Basic"
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Languages</h2>
      {languages.map((lang, index) => (
        <div key={index} className="mb-4">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Language"
              placeholder="Enter language"
              value={lang.name}
              onChange={(e) => onUpdate(index, "name", e.target.value)}
              className="flex-1"
            />
            <Select
              label="Proficiency"
              placeholder="Select proficiency"
              selectedKeys={lang.proficiency ? [lang.proficiency] : []}
              onChange={(e) => onUpdate(index, "proficiency", e.target.value)}
              className="flex-1"
            >
              {proficiencyLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      ))}
      <Button onClick={onAdd} className="w-full">
        Add Language
      </Button>
    </Card>
  );
}