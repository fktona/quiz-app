export interface User {
  id: string
  name: string
  email: string
  avatar: string
  score: number
  level: "Novice" | "Amateur" | "Master"
}

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

export interface QuizHistory {
  ref: string
  date: string
  duration: string
  score: number
}

export interface QuizState {
  currentQuestion: number
  timeRemaining: number
  answers: string[]
  score: number
}

