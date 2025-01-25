import { cookies } from "next/headers"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Layout from "@/components/layout"

async function getProfile() {
  const token = cookies().get("token")?.value
  const response = await fetch("https://quiz-project-dpaw.onrender.com/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch profile")
  }

  return response.json()
}

export default async function Profile() {
  const { data } = await getProfile()

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-2">Total Points</h2>
            <div className="text-3xl font-bold">
              {data.total_points}
              <span className="text-sm font-normal">pts</span>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-2">Current Level</h2>
            <div className="text-3xl font-bold">{data.current_level}</div>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h2 className="text-lg font-medium mb-4">Quiz History</h2>
          <div className="space-y-4">
            {data.quiz_history.map((quiz: any) => (
              <div key={quiz.quiz_id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{quiz.category}</div>
                  <div className="text-gray-500">{new Date(quiz.completed_at).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={quiz.percentage} className="flex-1" />
                  <div className="font-medium">
                    {quiz.score}/{quiz.total_questions}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-6 p-6">
          <h2 className="text-lg font-medium mb-4">Statistics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm text-gray-500">Total Quizzes Taken</div>
              <div className="text-2xl font-bold">{data.total_quizzes_taken}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Average Score</div>
              <div className="text-2xl font-bold">{data.average_score}%</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

