export type UserRole = 'candidate' | 'employer' | 'admin'

export interface User {
  _id: string
  username: string
  email: string
  role: UserRole
}
