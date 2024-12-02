import React from "react";
import RowSteps from "@/components/ui/row-steps";

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
  const currentStep = sections.findIndex(s => s.id === activeSection) + 1;
  
  const handleStepChange = (step: number) => {
    const newSection = sections[step - 1];
    if (newSection) {
      onSectionChange(newSection.id);
    }
  };

  return (
    <div className="p-6 mb-8">
      <RowSteps
        defaultStep={currentStep}
        currentStep={currentStep}
        onChange={handleStepChange}
        steps={sections.map(section => ({
          title: section.label,
        }))}
      />
    </div>
  );
};