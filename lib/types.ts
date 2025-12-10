export interface UserProfile {
  name: string
  age: number
  gender: "male" | "female" | "other"
  height: number
  weight: number
  fitnessGoal: "weight-loss" | "muscle-gain" | "endurance" | "flexibility" | "general-fitness"
  fitnessLevel: "beginner" | "intermediate" | "advanced"
  workoutLocation: "home" | "gym" | "outdoor"
  dietaryPreference: "veg" | "non-veg" | "vegan" | "keto"
  medicalHistory?: string
  stressLevel?: "low" | "medium" | "high"
}

export interface Exercise {
  name: string
  sets: number
  reps: string
  restTime: string
  description: string
}

export interface DayWorkout {
  day: string
  focus: string
  exercises: Exercise[]
}

export interface Meal {
  name: string
  description: string
  calories: number
  protein: string
  carbs: string
  fats: string
}

export interface DayMeals {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snacks: Meal[]
}

export interface FitnessPlan {
  workoutPlan: DayWorkout[]
  dietPlan: DayMeals
  tips: string[]
  motivation: string
}
