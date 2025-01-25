import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Layout from "@/components/layout"

export default function Results() {
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Score: 15</h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="font-medium text-blue-700">20</div>
                <div className="text-sm text-blue-600">Questions</div>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="font-medium text-green-700">15</div>
                <div className="text-sm text-green-600">Correct</div>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <div className="font-medium text-red-700">3</div>
                <div className="text-sm text-red-600">Incorrect</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Link href="/quiz">
              <Button className="w-full">Try Again</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

