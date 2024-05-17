import type { ContactFormData } from "../types/ContactFormData"

export async function submitContactForm(
  formData: ContactFormData,
): Promise<void> {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}