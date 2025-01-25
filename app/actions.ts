"use server";

import { cookies } from "next/headers";
import { login, register } from "@/lib/auth-service";
import { startQuiz, submitQuiz } from "@/lib/quiz-service";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const data = await login(username, password);
    cookies().set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return { success: true, data };
  } catch (error) {
    console.log(error, "error");
    if (error instanceof Error) {
      // Return the error message received from the backend
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Failed to login" };
    }
  }
}

export async function registerAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const data = await register(username, password);
    cookies().set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });
    console.log(data, "data");
    return { success: true, data };
    // redirect("/"); // Redirect to home page
  } catch (error) {
    if (error instanceof Error) {
      // Return the error message received from the backend
      console.log(error.message, "error");
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Failed to register" };
    }
  }
}

export async function logoutAction() {
  cookies().delete("token");
  redirect("/login");
}

export async function startQuizAction(category: string) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  const difficulty = "easy";

  try {
    const data = await startQuiz(token, category, difficulty);
    console.log(data, "data");
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message, "error");
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to start quiz" };
  }
}

export async function submitQuizAction(quizData: any) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const data = await submitQuiz(token, quizData);
    console.log(data, "data");
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to submit quiz" };
  }
}
