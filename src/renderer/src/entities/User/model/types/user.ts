export interface User {
  id: number
  name: string
}

export interface UserSchema {
  userData?: User
  error?: string
  isLoading: boolean
}
