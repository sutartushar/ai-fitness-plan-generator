import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Sparkles } from "lucide-react"

interface TipsMotivationProps {
  tips: string[]
  motivation: string
}

export function TipsMotivation({ tips, motivation }: TipsMotivationProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-chart-4" />
            AI Tips & Advice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-4/20 text-chart-4 text-sm font-medium flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Daily Motivation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-foreground/90">
            &ldquo;{motivation}&rdquo;
          </blockquote>
        </CardContent>
      </Card>
    </div>
  )
}
