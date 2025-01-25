import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import Link from "next/link"

interface ScoreModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  score: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
}

export function ScoreModal({
  isOpen,
  onOpenChange,
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
}: ScoreModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center p-6">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Score: {score}</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="font-medium text-blue-700">{totalQuestions}</div>
              <div className="text-sm text-blue-600">Questions</div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="font-medium text-green-700">{correctAnswers}</div>
              <div className="text-sm text-green-600">Correct</div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <div className="font-medium text-red-700">{incorrectAnswers}</div>
              <div className="text-sm text-red-600">Incorrect</div>
            </div>
          </div>
        </div>
        <Link href="/dashboard">
          <Button className="w-full">Check Result</Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}

