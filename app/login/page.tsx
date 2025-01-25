"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await loginAction(formData);
      if (result.success) {
        toast.success("Welcome back!");
        navigate.push("/");
      }
      if (result.success === false) {
        toast.error(result.error);
      }
      // If successful, the action will redirect
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <p className="text-gray-500 mt-2">
              Sign in to continue your learning journey
            </p>
          </CardHeader>
          <CardContent>
            <form action={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <Input id="username" name="username" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
