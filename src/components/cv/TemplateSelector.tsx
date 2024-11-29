import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layout } from "lucide-react";

interface TemplateSelectorProps {
  currentTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function TemplateSelector({
  currentTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="button-hover">
        <Layout className="mr-2 h-4 w-4" />
        Templates
      </Button>
      <Select value={currentTemplate} onValueChange={onTemplateChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="modern">Modern</SelectItem>
          <SelectItem value="minimal">Minimal</SelectItem>
          <SelectItem value="compact">Compact</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="creative">Creative</SelectItem>
          <SelectItem value="elegant">Elegant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}