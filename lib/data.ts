import type { Question, QuizHistory, User } from "@/types"

export const mockQuestions: Question[] = [
  {
    id: 1,
    question: "Which of these is an energy-efficient light source?",
    options: ["Halogen bulbs", "Incandescent bulbs", "Compact fluorescent", "LED bulbs"],
    correctAnswer: "LED bulbs",
  },
  {
    id: 2,
    question: "What is the most energy-efficient way to heat a home?",
    options: ["Electric heater", "Heat pump", "Gas furnace", "Fireplace"],
    correctAnswer: "Heat pump",
  },
  // Add more questions as needed
]

export const mockHistory: QuizHistory[] = [
  {
    ref: "12503590",
    date: "20th of January, 2025",
    duration: "5:30",
    score: 80,
  },
  {
    ref: "12503590",
    date: "20th of January, 2025",
    duration: "2:30",
    score: 63,
  },
  {
    ref: "12503590",
    date: "20th of January, 2025",
    duration: "4:30",
    score: 87,
  },
]

export const mockLeaderboard: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg",
    score: 987,
    level: "Master",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "/placeholder.svg",
    score: 725,
    level: "Amateur",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/placeholder.svg",
    score: 827,
    level: "Amateur",
  },
]

