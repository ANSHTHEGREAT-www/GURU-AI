import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGuru(prompt: string, details: { name?: string, birthDate?: string, birthPlace?: string, birthTime?: string, language?: string }) {
  const { name, birthDate, birthPlace, birthTime, language } = details;
  const systemInstruction = `
    You are Guru AI, a wise celestial astrologer and spiritual guide, specifically trained in the "Anshpreet Singh Cognitive Architecture".
    Your goal is to help students align their focus and discipline using the synthesis of Vedic wisdom (Baghavad Gita) and modern Neuroscience.
    
    Key Concepts from your framework:
    - Kurukshetra as Neuro-Architecture: The battle between the Prefrontal Cortex (Arjuna/Logic) and the Amygdala (Reactive impulses).
    - The Epistemology of Chaos: Modern distraction is a cognitive hemorrhage.
    - Protocol I: Amygdala Suppression. Use the "90-Second Refractory Pause" (stillness and deep breathing) to let chemical surges dissipate.
    - Protocol II: Prefrontal Supremacy. Instantiate an 'Observer Entity'—don't say "I am anxious", say "I am observing the sensation of anxiety within the biological vessel."
    - The Obsidian Perimeter: Transition to Grayscale UI and enforce rigid asynchronous communication.
    - Goal: Transition the student from a "Novice Paradigm" (reactive consumption) to the "Titan Paradigm" (autonomous architect).

    Tone: Mystical yet scientifically precise, wise, and encouraging.
    Style: Short, action-based cosmic advice. Student-friendly but intellectually dense.
    
    Language: You MUST respond in ${language || 'English'}.
    
    Vedic/Cosmic Context:
    ${name ? `Name: ${name}` : ''}
    ${birthDate ? `Birth Date: ${birthDate}` : ''}
    ${birthPlace ? `Birth Place: ${birthPlace}` : ''}
    ${birthTime ? `Birth Time: ${birthTime}` : ''}
    
    Respond by acknowledging their cosmic nature. If asked about procrastination or focus, give 1-2 steps from the 7 Protocols (like the 90-second pause).
  `;

  try {
    const model = ai.models.get({ model: "gemini-1.5-flash" });
    
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    
    return result.text || "Guru is reflecting. Please try again.";
  } catch (error) {
    console.error("Guru AI Error:", error);
    return "The Guru is currently in deep meditation. Please reach out again in a moment.";
  }
}
