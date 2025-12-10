import { GoogleGenAI } from "@google/genai"
import { z } from "zod"

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "" })

const exerciseSchema = z.object({
  name: z.string(),
  sets: z.number(),
  reps: z.string(),
  restTime: z.string(),
  description: z.string(),
})

const dayWorkoutSchema = z.object({
  day: z.string(),
  focus: z.string(),
  exercises: z.array(exerciseSchema),
})

const mealSchema = z.object({
  name: z.string(),
  description: z.string(),
  calories: z.number(),
  protein: z.string(),
  carbs: z.string(),
  fats: z.string(),
})

const fitnessPlanSchema = z.object({
  workoutPlan: z.array(dayWorkoutSchema).min(5).max(7),
  dietPlan: z.object({
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    snacks: z.array(mealSchema).min(1).max(2),
  }),
  tips: z.array(z.string()).min(4).max(6),
  motivation: z.string(),
})

export async function POST(req: Request) {
  try {
    const { profile } = await req.json()

    const prompt = `Create a comprehensive, personalized fitness and diet plan for the following user. You MUST respond with valid JSON only, no additional text.

User Profile:
- Name: ${profile.name}
- Age: ${profile.age}
- Gender: ${profile.gender}
- Height: ${profile.height}cm
- Weight: ${profile.weight}kg
- Fitness Goal: ${profile.fitnessGoal}
- Current Fitness Level: ${profile.fitnessLevel}
- Workout Location: ${profile.workoutLocation}
- Dietary Preference: ${profile.dietaryPreference}
${profile.medicalHistory ? `- Medical History: ${profile.medicalHistory}` : ""}
${profile.stressLevel ? `- Stress Level: ${profile.stressLevel}` : ""}

Create a detailed weekly workout plan (5-7 days) with exercises appropriate for their fitness level and available equipment at ${profile.workoutLocation}. Each exercise should include proper form tips in the description.

Create a daily diet plan that aligns with their ${profile.dietaryPreference} preference and ${profile.fitnessGoal} goal. Include realistic calorie and macro estimates.

Provide practical lifestyle tips considering their stress level and goals.

Include an inspirational motivational quote tailored to their fitness journey.

Respond with this exact JSON structure:
{
  "workoutPlan": [
    {
      "day": "Monday",
      "focus": "Upper Body",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "10-12",
          "restTime": "60 seconds",
          "description": "Form tips and description"
        }
      ]
    }
  ],
  "dietPlan": {
    "breakfast": { "name": "Meal Name", "description": "Description", "calories": 400, "protein": "25g", "carbs": "40g", "fats": "15g" },
    "lunch": { "name": "Meal Name", "description": "Description", "calories": 500, "protein": "35g", "carbs": "50g", "fats": "20g" },
    "dinner": { "name": "Meal Name", "description": "Description", "calories": 450, "protein": "30g", "carbs": "45g", "fats": "18g" },
    "snacks": [{ "name": "Snack Name", "description": "Description", "calories": 200, "protein": "10g", "carbs": "20g", "fats": "8g" }]
  },
  "tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4"],
  "motivation": "Motivational quote here"
}`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    })

    const text = response.text || ""

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response")
    }

    const plan = JSON.parse(jsonMatch[0])

    // Validate with Zod schema
    const validatedPlan = fitnessPlanSchema.parse(plan)

    return Response.json({ plan: validatedPlan })
  } catch (error) {
    console.error("Plan generation error:", error)
    return Response.json({ error: "Failed to generate plan. Please try again." }, { status: 500 })
  }
}
