import { CVData } from "@/types/cv";
import { CompactTemplate } from "./templates/CompactTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";

interface PreviewSectionProps {
  cvData: CVData;
  template: string;
}

export function PreviewSection({ cvData, template }: PreviewSectionProps) {
  return (
    <div className="animate-fade-in h-[calc(100vh-8rem)] overflow-y-auto sticky top-8">
      <div className="w-[794px] mx-auto bg-white shadow-lg"> {/* A4 width in pixels */}
        <div className="p-8 min-h-[1123px]"> {/* A4 height in pixels */}
          {template === "modern" && <ModernTemplate cvData={cvData} />}
          {template === "minimal" && <MinimalTemplate cvData={cvData} />}
          {template === "compact" && <CompactTemplate cvData={cvData} />}
          {template === "elegant" && <ElegantTemplate cvData={cvData} />}
          {template === "professional" && <ProfessionalTemplate cvData={cvData} />}
          {template === "creative" && <CreativeTemplate cvData={cvData} />}
        </div>
      </div>
    </div>
  );
}