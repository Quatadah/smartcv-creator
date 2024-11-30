import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Layout } from "lucide-react";

interface TemplateSelectorProps {
  template: string;
  setTemplate: (template: string) => void;
}

export function TemplateSelector({
  template,
  setTemplate,
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
        selectedKeys={[template]}
        onChange={(e) => setTemplate(e.target.value)}
        className="w-[180px]"
        placeholder="Select template"
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