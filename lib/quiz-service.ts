const API_URL = "https://quiz-project-dpaw.onrender.com/api";

export async function startQuiz(
  token: string,
  category: string,
  difficulty: string
) {
  console.log(token, category, difficulty);
  const response = await fetch(`${API_URL}/quiz/quiz/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ category, difficulty }),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  return response.json();
}

export async function submitQuiz(token: string, quizData: any) {
  console.log(quizData);
  const response = await fetch(`${API_URL}/quiz/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quiz_data: quizData }),
  });
  const data = await response.json();
  console.log(data, "dajjjta");

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error("Failed to submit quiz");
  }

  return response.json();
}
