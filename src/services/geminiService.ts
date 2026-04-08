import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("No Gemini API key found. Using a placeholder for development.");
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || 'placeholder' });
  }
  return aiClient;
}

export async function generateReadingMap(titleOrContent: string, isFile: boolean = false): Promise<any> {
  const ai = getGeminiClient();
  
  const prompt = `
    You are an expert book summarizer and knowledge map creator.
    Create a highly structured, insightful reading map for the following ${isFile ? 'document content' : 'book title'}:
    "${titleOrContent}"
    
    The reading map must be in JSON format and strictly follow this structure:
    {
      "title": "Book Title",
      "author": "Author Name",
      "cover": "A relevant unsplash image URL (e.g., https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop)",
      "oneLiner": { "zh": "One sentence summary in Chinese", "en": "One sentence summary in English" },
      "about": { "zh": "A short paragraph about the book in Chinese", "en": "A short paragraph about the book in English" },
      "stats": { "structure": 4, "volume": 300 },
      "readingPosition": { "zh": "Advice on how to read this book (e.g., don't read it linearly, focus on frameworks)" },
      "overview": {
        "title": "Main overview title",
        "subtitle": "Overview subtitle",
        "cards": [
          { "layer": "第一层", "title": "Card Title", "desc": "Card Description", "points": ["Point 1", "Point 2"], "color": "from-orange-500 to-amber-500" },
          { "layer": "第二层", "title": "Card Title", "desc": "Card Description", "points": ["Point 1", "Point 2"], "color": "from-pink-500 to-rose-500" },
          { "layer": "第三层", "title": "Card Title", "desc": "Card Description", "points": ["Point 1", "Point 2"], "color": "from-blue-500 to-cyan-500" },
          { "layer": "第四层", "title": "Card Title", "desc": "Card Description", "points": ["Point 1", "Point 2"], "color": "from-purple-500 to-indigo-500" }
        ]
      },
      "knowledgeMap": {
        "areas": [
          { "title": "Area 1", "status": "Status", "progress": 80, "color": "bg-orange-500", "desc": "Description" }
        ],
        "tools": [
          { "title": "Tool 1", "desc": "Description", "points": ["Point 1", "Point 2"] }
        ]
      },
      "parts": [
        {
          "id": "part1",
          "title": "Part 1 Title",
          "subtitle": "Subtitle",
          "navDesc": "Navigation description",
          "intro": "Introduction to this part",
          "tags": ["Tag 1", "Tag 2"],
          "task": "Main task of this part",
          "takeaways": ["Takeaway 1", "Takeaway 2"],
          "chapters": ["Chapter 1", "Chapter 2"],
          "position": "How to understand its position in the book"
        }
      ],
      "methods": {
        "categories": ["Category 1", "Category 2"],
        "items": [
          { "id": "01", "category": "Category 1", "title": "Method Title", "desc": "Method Description" }
        ]
      }
    }
    
    Ensure the content is deep, insightful, and not just a generic summary. Use Chinese for the main content fields (overview, knowledgeMap, parts, methods).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonStr = response.text?.trim() || "{}";
    const parsed = JSON.parse(jsonStr);
    
    // Add required fields
    parsed.id = `generated-${Date.now()}`;
    parsed.saves = 0;
    parsed.status = 'has_map';
    parsed.visibility = 'private';
    
    return parsed;
  } catch (error) {
    console.error("Error generating reading map:", error);
    throw error;
  }
}
