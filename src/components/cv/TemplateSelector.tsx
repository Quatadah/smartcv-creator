import { Select, SelectItem } from "@nextui-org/react";
import { Layout } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        className="flex items-center gap-2"
      >
        <Layout size={16} />
        Templates
      </Button>
      <Select
        selectedKeys={[template]}
        onChange={(e) => setTemplate(e.target.value)}
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