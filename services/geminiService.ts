
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askHealthBot(question: string, base64Image?: string): Promise<string> {
  try {
    const parts: any[] = [{ text: question }];
    if (base64Image) {
      const matches = base64Image.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        parts.push({
          inlineData: { mimeType: matches[1], data: matches[2] },
        });
      }
    }
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: `You are Pulseplus HealthBot, a friendly medical assistant. 
        Focus: 1. Prescription Analysis 2. Injury First Aid 3. Traditional Remedies.
        Always advise consulting an Ayushman-verified doctor for serious conditions.`,
      }
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    return "The assistant is currently unavailable.";
  }
}

export async function analyzeFoodItem(input: string): Promise<any> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this food item/meal: ${input}. Provide macro breakdown, a health score (1-5 stars), specific ingredient warnings (like palm oil or high sodium), and 3 healthier alternatives.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodItem: { type: Type.STRING },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.STRING },
                carbs: { type: Type.STRING },
                fats: { type: Type.STRING },
                fiber: { type: Type.STRING },
              },
              required: ["protein", "carbs", "fats", "fiber"]
            },
            healthScore: { type: Type.INTEGER },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            alternatives: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["foodItem", "macros", "healthScore", "warnings", "alternatives"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function simulateEmailSending(email: string, details: any): Promise<string> {
  try {
    const prompt = `Generate a professional medical appointment confirmation email for ${details.specialistName} on ${details.date} at ${details.time}. Recipient: ${email}. The subject should be "Booking Confirmed - Pulseplus Health". Include a discount code for Ayushman Bharat card holders.`;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Email confirmation sent successfully.";
  } catch (error) {
    return "Your booking is confirmed. Check your email.";
  }
}

export async function searchHomeRemedy(query: string): Promise<any> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a traditional home remedy for: ${query}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            benefits: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            preparation: { type: Type.STRING },
          },
          required: ["name", "benefits", "ingredients", "preparation"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return null;
  }
}

export async function generateWellnessPlan(type: 'diet' | 'yoga', preferences: string[]): Promise<string> {
  try {
    const prompt = `Create a ${type} plan: ${preferences.join(', ')}.`;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Unable to generate.";
  } catch (error) {
    return "Error generating plan.";
  }
}

// Added editProductImage function using gemini-2.5-flash-image for high-quality image manipulation and background removal tasks.
export async function editProductImage(base64Image: string, prompt: string): Promise<string | null> {
  try {
    const matches = base64Image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) return null;

    const mimeType = matches[1];
    const data = matches[2];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const resultMimeType = part.inlineData.mimeType || 'image/png';
          return `data:${resultMimeType};base64,${base64EncodeString}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("AI Image Editing Error:", error);
    return null;
  }
}
