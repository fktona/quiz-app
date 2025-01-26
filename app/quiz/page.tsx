"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Timer } from "lucide-react";
import Layout from "@/components/layout";
import { ScoreModal } from "@/components/score-modal";
import { startQuizAction, submitQuizAction } from "../actions";
import { toast } from "sonner";

interface Question {
  question: string;
  type: "multiple-choice" | "true-false";
  options?: string[];
  answer: string;
}

interface Answer {
  questionIndex: number;
  answer: string;
}

interface QuizResults {
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  results: {
    question: string;
    correct: boolean;
    answer: string;
    correctAnswer: string;
  }[];
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [category, setCategory] = useState<string>("");

  const questionsPerPage = 5;

  useEffect(() => {
    const categories = ["food", "water", "forest", "minerals"];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setCategory(randomCategory);

    async function initQuiz() {
      try {
        const result = await startQuizAction(randomCategory);
        if (result.success) {
          setQuestions(result.data.questions);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Failed to start quiz");
        console.error(error);
      }
    }

    initQuiz();
  }, []);

  const handleSubmit = useCallback(async () => {
    const currentQuestions = getCurrentQuestions();
    const allAnswered = currentQuestions.every((_, index) =>
      answers.find(
        (a) => a.questionIndex === currentPage * questionsPerPage + index
      )
    );

    if (!allAnswered) {
      toast.error("Please answer all questions before proceeding.");
      return;
    }

    if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      let score = 0;
      const results = questions.map((question, index) => {
        const userAnswer =
          answers.find((a) => a.questionIndex === index)?.answer || "No Answer";
        const correct = question.answer === userAnswer;
        if (correct) score += 1;

        return {
          question: question.question,
          correct,
          answer: userAnswer,
          correctAnswer: question.answer,
        };
      });

      setQuizResults({
        score,
        correctAnswers: score,
        incorrectAnswers: questions.length - score,
        totalQuestions: questions.length,
        results,
      });

      setShowScoreModal(true);

      try {
        const result = await submitQuizAction({
          category: category,
          difficulty: "easy",
          answers: answers.map((a) => ({
            question_index: a.questionIndex,
            answer: a.answer,
          })),
          score,
        });

        if (result.success) {
          toast.success("Quiz submitted successfully!");
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Failed to submit quiz");
        console.error(error);
      }
    }
  }, [answers, category, currentPage, questions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleSubmit]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getCurrentQuestions = () => {
    const start = currentPage * questionsPerPage;
    return questions.slice(start, start + questionsPerPage);
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionIndex === questionIndex);
      if (existing) {
        return prev.map((a) =>
          a.questionIndex === questionIndex ? { ...a, answer } : a
        );
      }
      return [...prev, { questionIndex, answer }];
    });
  };

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading Quiz...</h2>
            <p className="text-gray-500">
              Please wait while we prepare your questions
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
            <div className="font-medium">
              {currentPage * questionsPerPage +
                Math.min(
                  questionsPerPage,
                  questions.length - currentPage * questionsPerPage
                )}{" "}
              / {questions.length}
            </div>
          </div>
          <Progress
            value={(answers.length / questions.length) * 100}
            className="h-2"
          />
        </div>

        <div className="space-y-6">
          {getCurrentQuestions().map((question, index) => {
            const questionIndex = currentPage * questionsPerPage + index;
            return (
              <Card key={questionIndex} className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  {questionIndex + 1}. {question.question}
                </h2>
                <RadioGroup
                  value={
                    answers.find((a) => a.questionIndex === questionIndex)
                      ?.answer || ""
                  }
                  onValueChange={(value) =>
                    handleAnswerChange(questionIndex, value)
                  }
                >
                  <div className="space-y-3">
                    {question.type === "multiple-choice" && question.options ? (
                      question.options.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${questionIndex}-${option}`}
                          />
                          <Label htmlFor={`${questionIndex}-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="True"
                            id={`${questionIndex}-true`}
                          />
                          <Label htmlFor={`${questionIndex}-true`}>True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="False"
                            id={`${questionIndex}-false`}
                          />
                          <Label htmlFor={`${questionIndex}-false`}>
                            False
                          </Label>
                        </div>
                      </>
                    )}
                  </div>
                </RadioGroup>
              </Card>
            );
          })}
        </div>

        <div className="mt-6">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={
              !getCurrentQuestions().every((_, index) =>
                answers.find(
                  (a) =>
                    a.questionIndex === currentPage * questionsPerPage + index
                )
              )
            }
          >
            {currentPage === Math.ceil(questions.length / questionsPerPage) - 1
              ? "Submit"
              : "Next"}
          </Button>
        </div>

        {quizResults && (
          <ScoreModal
            isOpen={showScoreModal}
            onOpenChange={setShowScoreModal}
            score={quizResults.score}
            totalQuestions={quizResults.totalQuestions}
            correctAnswers={quizResults.correctAnswers}
            incorrectAnswers={quizResults.incorrectAnswers}
            results={quizResults.results}
          />
        )}
      </div>
    </Layout>
  );
}
