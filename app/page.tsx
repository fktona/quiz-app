import Link from "next/link"
import { Button } from "@/components/ui/button"
import Layout from "@/components/layout"

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz App</h1>
        <p className="text-xl mb-8">Test your knowledge on various topics!</p>
        <Link href="/quiz">
          <Button size="lg">Start a Quiz</Button>
        </Link>
      </div>
    </Layout>
  )
}

