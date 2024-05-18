import type { LoginData } from "./LoginData"
import type { User } from "./PersonalPageData"
import type { RegistrationData } from "./RegistrationData"

export interface UserState {
  user: User | null
  isAuthenticated: boolean
  role: string | null
  status: "idle" | undefined
  loginData: LoginData | null
  registrationData: RegistrationData | null
  loading: boolean
  error: string | null
}
