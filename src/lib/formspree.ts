const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "";

export async function submitContactForm(data: { name: string; email: string; message: string }) {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error("Formspree endpoint not configured - set VITE_FORMSPREE_ENDPOINT in .env");
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Form submission failed");
  }
}
