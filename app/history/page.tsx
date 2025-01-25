import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockHistory } from "@/lib/data";
import Link from "next/link";
import { Trophy } from "lucide-react";
import Layout from "@/components/layout";

export default function Dashboard() {
  const totalScore = 925;
  const averageScore = 78;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Progress</h2>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-500" />
                  <span>Novice</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Amateur</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-red-500" />
                  <span>Master</span>
                </div>
              </div>
            </div>
            <Progress value={33} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Answer 20+ questions to get to amateur
            </p>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Total Score</h3>
            <div className="text-3xl font-bold">
              {totalScore}
              <span className="text-sm font-normal">pts</span>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Average Score</h3>
            <div className="text-3xl font-bold">
              {averageScore}
              <span className="text-sm font-normal">pts</span>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">History</h2>
            <Link
              href="/history"
              className="text-sm text-blue-500 hover:underline"
            >
              See more
            </Link>
          </div>
          <Card className="divide-y">
            {mockHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <div className="font-medium">Ref: {item.ref}</div>
                  <div className="text-sm text-gray-500">{item.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">{item.duration}</div>
                  <div className="font-semibold">{item.score}%</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
