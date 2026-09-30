/**
 * Newsletter subscription. The marketing site has no backend of its own (per the plan), so this
 * posts to the configured provider endpoint when present and is a no-op in local development.
 */
export async function subscribeToNewsletter(email: string): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
  if (!endpoint) return;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "neamatglobal.com" }),
  });

  if (!response.ok) {
    throw new Error(`Newsletter subscription failed with ${response.status}`);
  }
}
