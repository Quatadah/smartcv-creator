import { CVData } from "@/types/cv";
import { CompactTemplate } from "./templates/CompactTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { useTheme } from "@/components/theme-provider";

interface PreviewSectionProps {
  cvData: CVData;
  template: string;
}

export function PreviewSection({ cvData, template }: PreviewSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 mt-16">
      <div 
        className={`w-full max-w-[1000px] mx-auto shadow-lg transform scale-[0.8] origin-top ${
          isDark ? "bg-background" : "bg-white"
        }`}
      >
        <div className="p-8 min-h-[29.7cm]">
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