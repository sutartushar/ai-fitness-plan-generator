"use client"

import { useState } from "react"
import { UserProfileForm } from "@/components/user-profile-form"
import { FitnessResults } from "@/components/fitness-results"
import type { UserProfile, FitnessPlan } from "@/lib/types"
import { Dumbbell, Sparkles } from "lucide-react"

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [plan, setPlan] = useState<FitnessPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (userProfile: UserProfile) => {
    setIsLoading(true)
    setProfile(userProfile)

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: userProfile }),
      })
      const data = await response.json()
      setPlan(data.plan)
    } catch (error) {
      console.error("Failed to generate plan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setPlan(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {!plan ? (
          <>
            <header className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Dumbbell className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                AI-Powered <span className="text-primary">Fitness</span> & <span className="text-accent">Diet</span>{" "}
                Planner
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Get a personalized workout routine and meal plan crafted by AI, tailored to your unique goals,
                preferences, and lifestyle.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Click any exercise or meal to see AI-generated visuals</span>
              </div>
            </header>
            <UserProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
          </>
        ) : (
          <FitnessResults plan={plan} profile={profile!} onBack={handleBack} />
        )}
      </div>
    </main>
  )
}
