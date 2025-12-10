"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserProfile } from "@/lib/types"
import { Dumbbell, Target, MapPin, Utensils, Heart, Brain, Loader2 } from "lucide-react"

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void
  isLoading: boolean
}

export function UserProfileForm({ onSubmit, isLoading }: UserProfileFormProps) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: "male",
    fitnessGoal: "general-fitness",
    fitnessLevel: "beginner",
    workoutLocation: "home",
    dietaryPreference: "non-veg",
    stressLevel: "medium",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (profile.name && profile.age && profile.height && profile.weight) {
      onSubmit(profile as UserProfile)
    }
  }

  const updateProfile = (key: keyof UserProfile, value: string | number) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={profile.name || ""}
              onChange={(e) => updateProfile("name", e.target.value)}
              required
              className="bg-input/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="25"
              min={13}
              max={100}
              value={profile.age || ""}
              onChange={(e) => updateProfile("age", Number.parseInt(e.target.value))}
              required
              className="bg-input/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={profile.gender} onValueChange={(value) => updateProfile("gender", value)}>
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="175"
                min={100}
                max={250}
                value={profile.height || ""}
                onChange={(e) => updateProfile("height", Number.parseInt(e.target.value))}
                required
                className="bg-input/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                min={30}
                max={300}
                value={profile.weight || ""}
                onChange={(e) => updateProfile("weight", Number.parseInt(e.target.value))}
                required
                className="bg-input/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fitness Goals */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-accent" />
            Fitness Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fitnessGoal">Primary Goal</Label>
            <Select value={profile.fitnessGoal} onValueChange={(value) => updateProfile("fitnessGoal", value)}>
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="endurance">Build Endurance</SelectItem>
                <SelectItem value="flexibility">Improve Flexibility</SelectItem>
                <SelectItem value="general-fitness">General Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fitnessLevel">Current Fitness Level</Label>
            <Select value={profile.fitnessLevel} onValueChange={(value) => updateProfile("fitnessLevel", value)}>
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workout & Diet Preferences */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Dumbbell className="h-5 w-5 text-primary" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="workoutLocation" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Workout Location
            </Label>
            <Select value={profile.workoutLocation} onValueChange={(value) => updateProfile("workoutLocation", value)}>
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dietaryPreference" className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-muted-foreground" />
              Dietary Preference
            </Label>
            <Select
              value={profile.dietaryPreference}
              onValueChange={(value) => updateProfile("dietaryPreference", value)}
            >
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="veg">Vegetarian</SelectItem>
                <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Optional Information */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-chart-3" />
            Additional Information (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="stressLevel">Stress Level</Label>
            <Select value={profile.stressLevel} onValueChange={(value) => updateProfile("stressLevel", value)}>
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="Select stress level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="medicalHistory">Medical History / Notes</Label>
            <Textarea
              id="medicalHistory"
              placeholder="Any injuries, conditions, or notes we should know about..."
              value={profile.medicalHistory || ""}
              onChange={(e) => updateProfile("medicalHistory", e.target.value)}
              className="bg-input/50 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full text-lg font-semibold" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Your Plan...
          </>
        ) : (
          <>
            <Dumbbell className="mr-2 h-5 w-5" />
            Generate My Fitness Plan
          </>
        )}
      </Button>
    </form>
  )
}
