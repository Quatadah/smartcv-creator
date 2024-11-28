import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, RefreshCw } from "lucide-react";
import { AIService } from "@/lib/ai-service";

interface CVAnalyzerProps {
  cvData: any;
}

export function CVAnalyzer({ cvData }: CVAnalyzerProps) {
  const [analysis, setAnalysis] = useState<{
    score: number;
    suggestions: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCv = async () => {
    setIsAnalyzing(true);
    try {
      const result = await AIService.analyzeCVStrength(cvData);
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to analyze CV:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">CV Strength Analysis</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={analyzeCv}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <BarChart className="w-4 h-4 mr-2" />
          )}
          {isAnalyzing ? "Analyzing..." : "Analyze CV"}
        </Button>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">CV Strength Score</span>
              <span className="text-sm font-medium">{analysis.score}%</span>
            </div>
            <Progress value={analysis.score} className="h-2" />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Improvement Suggestions:</h4>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}