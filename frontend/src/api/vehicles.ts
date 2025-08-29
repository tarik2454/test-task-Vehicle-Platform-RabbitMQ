const base = import.meta.env.VITE_VEHICLE_API_URL || "http://localhost:4002";

export async function listVehicles() {
  const res = await fetch(`${base}/vehicles`);
  return res.json();
}

export async function createVehicle(payload: {
  make: string;
  model: string;
  year?: number;
  user_id: number;
}) {
  const res = await fetch(`${base}/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
