import type { Application, Job, User } from '@/types'
import { useFetch } from './useFetch'

const useFetchData = (dataModels: string[], dep: string) => {
  let jobs
  let applications
  let users

  if (dataModels.includes('job')) {
    const jobsData = useFetch<{ success: boolean; data: { jobs: Job[] } }>(
      '/api/jobs',
      dep
    )
    jobs = jobsData?.data?.jobs
  }

  if (dataModels.includes('application')) {
    const applicationsData = useFetch<{
      success: boolean
      data: { applications: Application[] }
    }>('/api/applications', dep)
    applications = applicationsData?.data?.applications
  }

  if (dataModels.includes('user')) {
    const usersData = useFetch<{
      success: boolean
      data: { users: User[] }
    }>('/api/users', dep)
    users = usersData?.data?.users
  }

  return { jobs, applications, users }
}

export default useFetchData
