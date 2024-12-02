import { Select, SelectItem, Button } from "@nextui-org/react";
import { Layout } from "lucide-react";

interface TemplateSelectorProps {
  currentTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function TemplateSelector({
  currentTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  const templates = [
    { value: "modern", label: "Modern" },
    { value: "minimal", label: "Minimal" },
    { value: "compact", label: "Compact" },
    { value: "professional", label: "Professional" },
    { value: "creative", label: "Creative" },
    { value: "elegant", label: "Elegant" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="bordered"
        startContent={<Layout size={16} />}
      >
        Templates
      </Button>
      <Select
        selectedKeys={[currentTemplate]}
        onChange={(e) => onTemplateChange(e.target.value)}
        className="w-[180px]"
        placeholder="Select template"
        variant="bordered"
      >
        {templates.map((template) => (
          <SelectItem key={template.value} value={template.value}>
            {template.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}