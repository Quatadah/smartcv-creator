import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wand2, Sparkles, BarChart } from "lucide-react";
import { AIService } from "@/lib/ai-service";
import { toast } from "sonner";

interface AIAssistantProps {
  onSuggestionApply: (suggestion: string) => void;
  section: string;
  currentContent: string;
}

export function AIAssistant({ onSuggestionApply, section, currentContent }: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const generateSuggestion = async () => {
    setIsLoading(true);
    try {
      const result = await AIService.generateSuggestion(section, currentContent);
      setSuggestion(result);
      toast.success("AI suggestion generated!");
    } catch (error) {
      toast.error("Failed to generate suggestion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <Button
        variant="outline"
        size="sm"
        className="w-full mb-2"
        onClick={generateSuggestion}
        disabled={isLoading}
      >
        <Wand2 className="w-4 h-4 mr-2" />
        {isLoading ? "Generating..." : "Get AI Suggestion"}
      </Button>

      {suggestion && (
        <Card className="p-4 mt-2 bg-muted/50">
          <p className="text-sm mb-2">{suggestion}</p>
          <Button
            size="sm"
            onClick={() => onSuggestionApply(suggestion)}
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Apply Suggestion
          </Button>
        </Card>
      )}
    </div>
  );
}