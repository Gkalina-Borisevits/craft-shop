import type { LoginData } from "../types/LoginData"
import type { User } from "../types/PersonalPageData"
import type { RegistrationData } from "../types/RegistrationData"

export async function personalPageUser(formData: User): Promise<User> {
  const res = await fetch("api/user", {
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
export async function loginUser(formData: LoginData): Promise<User> {
  const res = await fetch("api/user", {
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

export async function user(): Promise<{
	id: number;
  name: string;
	email: string;
	role: string;
}> {
	const res = await fetch('/api/user/');
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}

export async function registerUser(formData: RegistrationData): Promise<User> {
  const res = await fetch("api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
  if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return res.json();
}

export async function deletePersonalPageUser(): Promise<void> {
  const res = await fetch("api/user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    throw new Error("Failed to login")
  }
  return res.json()
}

export async function activateAccountUser(validationCode: string): Promise<User> {
  const res = await fetch("/api/activate", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ validationCode }),
  });
  interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
  if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return res.json();
}
