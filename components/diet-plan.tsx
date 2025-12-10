"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DayMeals, Meal } from "@/lib/types"
import { Utensils, Flame, Loader2, ImageIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DietPlanProps {
  dietPlan: DayMeals
}

const mealTypeColors = {
  breakfast: "bg-chart-4/20 text-chart-4",
  lunch: "bg-primary/20 text-primary",
  dinner: "bg-accent/20 text-accent",
  snack: "bg-chart-3/20 text-chart-3",
}

export function DietPlan({ dietPlan }: DietPlanProps) {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [mealImage, setMealImage] = useState<string | null>(null)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleMealClick = async (meal: Meal) => {
    setSelectedMeal(meal)
    setIsDialogOpen(true)
    setIsLoadingImage(true)
    setMealImage(null)

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Professional food photography of ${meal.name}, ${meal.description}, beautifully plated, appetizing, high quality, soft natural lighting`,
          type: "food",
        }),
      })
      const data = await response.json()
      if (data.imageUrl) {
        setMealImage(data.imageUrl)
      }
    } catch (error) {
      console.error("Failed to generate image:", error)
    } finally {
      setIsLoadingImage(false)
    }
  }

  const MealCard = ({ meal, type }: { meal: Meal; type: "breakfast" | "lunch" | "dinner" | "snack" }) => (
    <button
      onClick={() => handleMealClick(meal)}
      className="w-full text-left p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={mealTypeColors[type]}>{type}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Flame className="h-3 w-3" />
              {meal.calories} cal
            </span>
          </div>
          <p className="font-medium text-foreground group-hover:text-primary transition-colors">{meal.name}</p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{meal.description}</p>
        </div>
        <ImageIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
      </div>
    </button>
  )

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Utensils className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold">Daily Diet Plan</h2>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Today&apos;s Meals</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <MealCard meal={dietPlan.breakfast} type="breakfast" />
            <MealCard meal={dietPlan.lunch} type="lunch" />
            <MealCard meal={dietPlan.dinner} type="dinner" />
            {dietPlan.snacks.map((snack, index) => (
              <MealCard key={index} meal={snack} type="snack" />
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-accent" />
              {selectedMeal?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {isLoadingImage ? (
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Generating food visual...</p>
                </div>
              </div>
            ) : mealImage ? (
              <img
                src={mealImage || "/placeholder.svg"}
                alt={selectedMeal?.name}
                className="w-full aspect-video object-cover rounded-lg"
              />
            ) : (
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Image unavailable</p>
              </div>
            )}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-accent">{selectedMeal?.calories}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div className="p-2 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-primary">{selectedMeal?.protein}</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div className="p-2 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-chart-4">{selectedMeal?.carbs}</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div className="p-2 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-chart-3">{selectedMeal?.fats}</p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{selectedMeal?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
