import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "" })

export async function POST(req: Request) {
  const { prompt, type } = await req.json()

  try {
    const imagePrompt =
      type === "exercise"
        ? `Professional fitness photography: ${prompt}. Show proper form and technique, gym or workout environment, high quality realistic photo.`
        : `Professional food photography: ${prompt}. Appetizing presentation, natural lighting, high quality realistic photo of the meal.`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: imagePrompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    })

    // Extract image from response parts
    const parts = response.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        return Response.json({
          imageUrl: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
        })
      }
    }

    // Fallback to placeholder if no image generated
    return Response.json({
      imageUrl: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(prompt)}`,
    })
  } catch (error) {
    console.error("Image generation error:", error)
    return Response.json({
      imageUrl: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(prompt)}`,
    })
  }
}
