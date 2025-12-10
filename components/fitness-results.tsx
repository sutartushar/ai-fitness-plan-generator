"use client"

import type { FitnessPlan, UserProfile } from "@/lib/types"
import { WorkoutPlan } from "./workout-plan"
import { DietPlan } from "./diet-plan"
import { TipsMotivation } from "./tips-motivation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FitnessResultsProps {
  plan: FitnessPlan
  profile: UserProfile
  onBack: () => void
}

export function FitnessResults({ plan, profile, onBack }: FitnessResultsProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-2 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Plan
          </Button>
          <h1 className="text-3xl font-bold">Your Personalized Plan</h1>
          <p className="text-muted-foreground mt-1">Crafted specifically for {profile.name}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-primary border-primary">
            <User className="mr-1 h-3 w-3" />
            {profile.fitnessLevel}
          </Badge>
          <Badge variant="outline" className="text-accent border-accent">
            {profile.fitnessGoal.replace("-", " ")}
          </Badge>
          <Badge variant="outline" className="text-chart-3 border-chart-3">
            {profile.workoutLocation}
          </Badge>
        </div>
      </div>

      <WorkoutPlan workoutPlan={plan.workoutPlan} />
      <DietPlan dietPlan={plan.dietPlan} />
      <TipsMotivation tips={plan.tips} motivation={plan.motivation} />
    </div>
  )
}
