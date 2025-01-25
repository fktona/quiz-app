const API_URL = "https://quiz-project-dpaw.onrender.com/api";

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    console.log(response);
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function register(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.message);
  }

  return response.json();
}
