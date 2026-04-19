export const aiService = {
  async generateRecipe(ingredients, cuisine = 'Any', maxTime = 30) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env.local file.");
    }

    const prompt = `
You are a professional chef. Generate a structured recipe based on the following:
Ingredients available: ${ingredients.join(', ')}
Preferred Cuisine: ${cuisine}
Maximum Cooking Time: ${maxTime} minutes

Output STRICTLY in JSON format matching this schema exactly:
{
  "recipeName": "String",
  "ingredients": [
    { "name": "String", "quantity": "String" }
  ],
  "steps": ["String"],
  "cookingTime": Number,
  "spices": ["String"],
  "difficulty": "String (Easy, Medium, Hard)"
}
Do not include markdown blocks or any other text, just valid JSON.
`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe from Gemini service.');
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      
      // Safety cleanup in case Gemini wraps the response in markdown blocks
      const cleanContent = content.replace(/^```json\n/, '').replace(/\n```$/, '').trim();
      
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error("AI Generation Error:", error);
      throw new Error("Failed to generate recipe. Please try again.");
    }
  }
};
