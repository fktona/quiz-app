"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/layout";

const topUsers = [
  {
    rank: 1,
    name: "Sarah Johnson",
    score: 987,
    avatar: "/placeholder.jpg",
    ribbonColor: "bg-yellow-500",
  },
  {
    rank: 2,
    name: "Michael Chen",
    score: 725,
    avatar: "/placeholder.jpg",
    ribbonColor: "bg-red-500",
  },
  {
    rank: 3,
    name: "Emma Wilson",
    score: 827,
    avatar: "/placeholder.jpg",
    ribbonColor: "bg-green-500",
  },
];

const otherUsers = [
  {
    rank: 4,
    name: "James Rodrigues",
    score: 700,
    avatar: "/placeholder.jpg",
  },
  {
    rank: 5,
    name: "Toni Kroos",
    score: 610,
    avatar: "/placeholder.jpg",
  },
  {
    rank: 6,
    name: "Isco Gonzales",
    score: 390,
    avatar: "/placeholder.jpg",
  },
];

export default function Leaderboard() {
  // Reorder top users to show 2nd, 1st, 3rd
  const orderedTopUsers = [topUsers[1], topUsers[0], topUsers[2]];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative h-[280px] md:h-[300px] bg-blue-500 rounded-lg mb-4 md:mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end gap-4 md:gap-8">
              {orderedTopUsers.map((user, index) => {
                const isWinner = index === 1;
                const avatarSize = isWinner
                  ? "w-24 h-24 md:w-32 md:h-32"
                  : "w-20 h-20 md:w-24 md:h-24";
                const marginBottom =
                  index === 0 ? "mb-8" : index === 2 ? "mb-16" : "";

                return (
                  <div
                    key={user.rank}
                    className={`text-center ${marginBottom}`}
                  >
                    <div className="relative">
                      <Avatar className={`${avatarSize} border-4 border-white`}>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-12 flex items-center justify-center">
                        <div
                          className={`${user.ribbonColor} w-full h-6 clip-ribbon`}
                        />
                        <span className="absolute text-white font-bold">
                          {user.rank}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 text-white font-semibold text-sm md:text-base">
                      {user.name}
                    </div>
                    <div className="text-white/80 text-sm">{user.score}pts</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Card className="divide-y divide-border">
          {otherUsers.map((user) => (
            <div
              key={user.rank}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 text-center font-medium text-muted-foreground">
                  {user.rank}
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{user.name}</div>
              </div>
              <div className="font-semibold">{user.score}pts</div>
            </div>
          ))}
        </Card>
      </div>
    </Layout>
  );
}
