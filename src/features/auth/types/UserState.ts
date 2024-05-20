import type { User } from "./User"

export interface UserState {
  user: User | null
  isAuthenticated: boolean
  status: "idle" | undefined
  loading: boolean
  error: string | null
}
