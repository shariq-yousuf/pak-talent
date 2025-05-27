export type UserRole = 'candidate' | 'employer' | 'admin'

export interface User {
  _id: string
  username: string
  email: string
  role: UserRole
}

export interface Job {
  _id: string
  title: string
  description: string
  salary: number
  type: string
  tags: string[]
  employer: User
  createdAt: Date
  updatedAt: Date
  deadline: Date
}

export interface Application {
  _id: string
  job: Job
  candidate: User
  status: 'applied' | 'interview' | 'rejected' | 'offered'
  coverLetter?: string
  resume: string
  createdAt: Date
  updatedAt: Date
}
