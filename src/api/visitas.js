export async function get() {
  // 1. Obtener nuevos tokens (solo si usas usuario fijo)
  const tokenResponse = await fetch("https://visitas-empresa.onrender.com/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.JWT_USER,
      password: process.env.JWT_PASSWORD
    })
  });

  const tokens = await tokenResponse.json();

  // 2. Consumir tu API protegida con el access token
  const apiResponse = await fetch("https://visitas-empresa.onrender.com/api/visitas/", {
    headers: {
      Authorization: `Bearer ${tokens.access}`
    }
  });

  const data = await apiResponse.json();

  // 3. Devolver datos al frontend
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
