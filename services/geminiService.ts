import { GoogleGenAI, Type } from "@google/genai";
import { CandidateProfile } from "../types";

// NOTE: In a production app, the API Key should be securely managed.
// This demo assumes process.env.API_KEY is available or requires user input if not.
// For the purpose of this demo, we will check if the key exists.

const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const analyzeCV = async (cvText: string): Promise<CandidateProfile> => {
  if (!apiKey) {
    // Fallback if no API key is present for demo purposes
    console.warn("No API Key found. Returning mock profile.");
    return {
      summary: "Senior Marketing Professional with 12 years of experience in Automotive and Sports sectors. Expert in brand strategy and team leadership.",
      skills: ["Brand Strategy", "Digital Marketing", "Stakeholder Management", "Campaign Leadership", "Budget Management"],
      yearsExperience: 12,
      seniorityLevel: "Head",
      industries: ["Automotive", "Sports"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Analyze the following CV text and extract a structured candidate profile.
        Return strictly JSON matching this schema:
        {
          "summary": "Short professional summary",
          "skills": ["Skill 1", "Skill 2", ...],
          "yearsExperience": number,
          "seniorityLevel": "Manager" | "Senior Manager" | "Head" | "Director",
          "industries": ["Industry 1", "Industry 2"]
        }
        
        CV TEXT:
        ${cvText.substring(0, 8000)}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            yearsExperience: { type: Type.NUMBER },
            seniorityLevel: { type: Type.STRING, enum: ["Manager", "Senior Manager", "Head", "Director"] },
            industries: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CandidateProfile;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("AI Analysis Failed", error);
    // Fallback
    return {
        summary: "Error analyzing CV. Please check API key.",
        skills: [],
        yearsExperience: 0,
        seniorityLevel: "Manager",
        industries: []
    };
  }
};

export const generateCoverLetter = async (
  jobTitle: string,
  company: string,
  candidateProfile: CandidateProfile
): Promise<string> => {
  if (!apiKey) {
    return `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${jobTitle} position at ${company}. With over ${candidateProfile.yearsExperience} years of experience in ${candidateProfile.industries.join(' and ')}, combined with my expertise in ${candidateProfile.skills.slice(0, 2).join(' and ')}, I am confident in my ability to drive value for your team.\n\nMy background includes delivering high-impact strategies and leading cross-functional teams to success. I would welcome the opportunity to discuss how my leadership in ${candidateProfile.skills[2] || 'marketing'} can support ${company}'s goals—please let me know when you are available for a conversation.`;
  }

  try {
    const prompt = `
      Write a tailored email cover letter for a job application.
      Job: ${jobTitle} at ${company}.
      Candidate Seniority: ${candidateProfile.seniorityLevel}.
      Candidate Skills: ${candidateProfile.skills.join(', ')}.
      Candidate Industry Exp: ${candidateProfile.industries.join(', ')}.
      
      RULES:
      1. Strictly 2 paragraphs.
      2. Strictly 2 sentences per paragraph.
      3. Tone: Professional, confident, concise, UK English.
      4. Paragraph 1: Express interest and connect experience/sector fit.
      5. Paragraph 2: Highlight key strengths and include a clear call to action to discuss further.
      6. No subject line, just the body text.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Could not generate cover letter.";

  } catch (error) {
    console.error("Cover Letter Generation Failed", error);
    return "Error generating cover letter.";
  }
};
