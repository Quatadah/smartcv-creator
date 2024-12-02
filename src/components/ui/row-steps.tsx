import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
}

interface RowStepsProps {
  steps: Step[];
  defaultStep?: number;
  currentStep?: number;
  onChange?: (step: number) => void;
  className?: string;
}

const RowSteps: React.FC<RowStepsProps> = ({
  steps,
  defaultStep = 1,
  currentStep: controlledStep,
  onChange,
  className,
}) => {
  const [internalStep, setInternalStep] = React.useState(defaultStep);
  const currentStep = controlledStep ?? internalStep;

  const handleStepClick = (stepIndex: number) => {
    if (!onChange) {
      setInternalStep(stepIndex);
    } else {
      onChange(stepIndex);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex justify-between">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 h-0.5 w-full bg-muted">
          <div
            className="absolute top-0 h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={step.title}
              className={cn(
                "relative flex flex-col items-center cursor-pointer",
                "transition-all duration-300",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => handleStepClick(stepNumber)}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
                  "transition-all duration-300",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                  isCurrent && "ring-4 ring-primary/30"
                )}
              >
                {stepNumber}
              </div>

              {/* Step Title */}
              <div className="absolute -bottom-8 whitespace-nowrap text-sm font-medium">
                {step.title}
              </div>

              {/* Optional Description */}
              {step.description && (
                <div className="absolute -bottom-16 whitespace-nowrap text-xs text-gray-500">
                  {step.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RowSteps;
