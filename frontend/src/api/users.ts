const base = import.meta.env.VITE_USER_API_URL || "http://localhost:4001";

export async function listUsers() {
  const res = await fetch(`${base}/users`);
  return res.json();
}

export async function createUser(payload: { email: string; name?: string }) {
  const res = await fetch(`${base}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
