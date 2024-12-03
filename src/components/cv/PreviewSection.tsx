import { CVData } from "@/types/cv";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { CompactTemplate } from "./templates/CompactTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";

interface PreviewSectionProps {
  cvData: CVData;
  template: string;
}

export function PreviewSection({ cvData, template }: PreviewSectionProps) {
  return (
    <div className="animate-fade-in h-[calc(100vh-8rem)] overflow-y-auto sticky top-8">
      <div className="max-w-[794px] mx-auto bg-white shadow-lg"> {/* A4 width in pixels */}
        {template === "modern" && <ModernTemplate cvData={cvData} />}
        {template === "minimal" && <MinimalTemplate cvData={cvData} />}
        {template === "compact" && <CompactTemplate cvData={cvData} />}
        {template === "elegant" && <ElegantTemplate cvData={cvData} />}
        {template === "professional" && <ProfessionalTemplate cvData={cvData} />}
        {template === "creative" && <CreativeTemplate cvData={cvData} />}
      </div>
    </div>
  );
}