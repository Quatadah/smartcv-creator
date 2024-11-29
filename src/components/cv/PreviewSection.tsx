import { CVData } from "@/types/cv";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { CompactTemplate } from "./templates/CompactTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";

interface PreviewSectionProps {
  cvData: CVData;
  template: string;
}

export function PreviewSection({ cvData, template }: PreviewSectionProps) {
  return (
    <div className="animate-fade-in h-[calc(100vh-8rem)] overflow-y-auto sticky top-8">
      {template === "modern" && <ModernTemplate cvData={cvData} />}
      {template === "minimal" && <MinimalTemplate cvData={cvData} />}
      {template === "compact" && <CompactTemplate cvData={cvData} />}
      {template === "elegant" && <ElegantTemplate cvData={cvData} />}
    </div>
  );
}