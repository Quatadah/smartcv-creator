import { toast } from "sonner";

// Simulated AI response delay
const SIMULATED_DELAY = 1000;

export interface AIResponse {
  text: string;
  status: 'success' | 'error';
}

// Simulate AI response with predefined suggestions
async function simulateAIResponse(prompt: string): Promise<AIResponse> {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  const responses = {
    summary: {
      text: "Innovative and results-driven professional with extensive experience in developing scalable solutions. Demonstrated expertise in leading cross-functional teams and delivering high-impact projects. Strong focus on user experience and technical excellence.",
      status: 'success' as const
    },
    skills: {
      text: "Based on your experience, consider adding: Project Management, Team Leadership, Agile Methodologies, Stakeholder Communication, Strategic Planning",
      status: 'success' as const
    },
    experience: {
      text: "• Led cross-functional teams in delivering complex projects\n• Reduced operational costs by 25% through process optimization\n• Implemented innovative solutions resulting in 40% efficiency improvement\n• Managed stakeholder relationships and client communications",
      status: 'success' as const
    }
  };

  const defaultResponse = {
    text: "I can help you improve this section with more specific and impactful content. Would you like suggestions for better phrasing or additional points to include?",
    status: 'success' as const
  };

  return responses[prompt.toLowerCase()] || defaultResponse;
}

export const AIService = {
  async generateSuggestion(section: string, currentContent: string): Promise<string> {
    try {
      const response = await simulateAIResponse(section);
      if (response.status === 'success') {
        return response.text;
      }
      throw new Error('Failed to generate suggestion');
    } catch (error) {
      toast.error('Failed to generate AI suggestion');
      return currentContent;
    }
  },

  async improveContent(content: string): Promise<string> {
    try {
      const response = await simulateAIResponse('improve');
      if (response.status === 'success') {
        return response.text;
      }
      throw new Error('Failed to improve content');
    } catch (error) {
      toast.error('Failed to improve content');
      return content;
    }
  },

  async analyzeCVStrength(cvData: any): Promise<{
    score: number;
    suggestions: string[];
  }> {
    // Simulate CV analysis
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    
    const score = Math.floor(Math.random() * 30) + 70; // Score between 70-100
    const suggestions = [
      "Add more quantifiable achievements in your experience section",
      "Consider including relevant certifications",
      "Expand your skills section with industry-specific keywords",
      "Make your summary more impactful with specific achievements"
    ];

    return { score, suggestions };
  }
};