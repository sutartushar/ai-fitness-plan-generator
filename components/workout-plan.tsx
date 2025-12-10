"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DayWorkout, Exercise } from "@/lib/types"
import { Dumbbell, Clock, RefreshCw, ImageIcon, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WorkoutPlanProps {
  workoutPlan: DayWorkout[]
}

export function WorkoutPlan({ workoutPlan }: WorkoutPlanProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [exerciseImage, setExerciseImage] = useState<string | null>(null)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleExerciseClick = async (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setIsDialogOpen(true)
    setIsLoadingImage(true)
    setExerciseImage(null)

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Professional fitness photo of a person demonstrating ${exercise.name} exercise in a modern gym setting, proper form, high quality, realistic lighting`,
          type: "exercise",
        }),
      })
      const data = await response.json()
      if (data.imageUrl) {
        setExerciseImage(data.imageUrl)
      }
    } catch (error) {
      console.error("Failed to generate image:", error)
    } finally {
      setIsLoadingImage(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Dumbbell className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Weekly Workout Plan</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workoutPlan.map((day, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{day.day}</CardTitle>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {day.focus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {day.exercises.map((exercise, exIndex) => (
                  <button
                    key={exIndex}
                    onClick={() => handleExerciseClick(exercise)}
                    className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {exercise.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" />
                            {exercise.sets} x {exercise.reps}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {exercise.restTime}
                          </span>
                        </div>
                      </div>
                      <ImageIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              {selectedExercise?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {isLoadingImage ? (
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Generating exercise visual...</p>
                </div>
              </div>
            ) : exerciseImage ? (
              <img
                src={exerciseImage || "/placeholder.svg"}
                alt={selectedExercise?.name}
                className="w-full aspect-video object-cover rounded-lg"
              />
            ) : (
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Image unavailable</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-primary">{selectedExercise?.sets}</p>
                <p className="text-xs text-muted-foreground">Sets</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-accent">{selectedExercise?.reps}</p>
                <p className="text-xs text-muted-foreground">Reps</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-chart-3">{selectedExercise?.restTime}</p>
                <p className="text-xs text-muted-foreground">Rest</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{selectedExercise?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
