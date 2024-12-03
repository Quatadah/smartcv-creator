import { Card, Textarea } from "@nextui-org/react";
import { AIAssistant } from "./AIAssistant";

interface SummarySectionProps {
  summary: string;
  onUpdate: (value: string) => void;
}

export function SummarySection({ summary, onUpdate }: SummarySectionProps) {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
      <Textarea
        value={summary}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Write a brief professional summary..."
      />
      <AIAssistant
        section="summary"
        currentContent={summary}
        onSuggestionApply={onUpdate}
      />
    </Card>
  );
}
