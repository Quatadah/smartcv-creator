import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Section {
  id: string;
  label: string;
  step: number;
}

interface StepperProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const Stepper = ({ sections, activeSection, onSectionChange }: StepperProps) => {
  const getStepStatus = (sectionId: string) => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const thisIndex = sections.findIndex(s => s.id === sectionId);
    return thisIndex < currentIndex ? "completed" : thisIndex === currentIndex ? "current" : "upcoming";
  };

  return (
    <div className="bg-card p-6 mb-8 rounded-lg border shadow-sm">
      <div className="flex justify-between relative">
        {sections.map((section, index) => (
          <div key={section.id} className="flex flex-col items-center relative w-full">
            {index > 0 && index < sections.length - 1 && (
              <div 
                className={cn(
                  "absolute top-4 h-0.5 left-[100%] w-[30%]",
                  getStepStatus(section.id) === "completed"
                    ? "bg-primary"
                    : "bg-accent"
                )}
              />
            )}
            
            <button
              onClick={() => onSectionChange(section.id)}
              className="flex flex-col items-center space-y-2 relative z-10"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                  getStepStatus(section.id) === "completed" 
                    ? "bg-primary border-primary"
                    : getStepStatus(section.id) === "current"
                    ? "bg-background border-primary text-primary"
                    : "border-muted bg-background text-muted"
                )}
              >
                {getStepStatus(section.id) === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{section.step}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  getStepStatus(section.id) === "completed"
                    ? "text-foreground"
                    : getStepStatus(section.id) === "current"
                    ? "text-primary"
                    : ""
                )}
              >
                {section.label}
              </span>
            </button>

            {/* Connecting line */}
            {index < sections.length - 1 && (
              <div 
                className={cn(
                  "absolute top-4 h-0.5 w-full",
                  getStepStatus(section.id) === "completed"
                    ? "bg-primary"
                    : "bg-accent"
                )}
                style={{ left: '50%' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};