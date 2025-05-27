import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFetch } from '@/hooks/useFetch'
import type { Application, Job } from '@/types'
import ApplicationCard from '../ui/application-card'
import JobCard from '../ui/job-card'

const CandidateScreen = () => {
  const jobsData = useFetch<{ success: boolean; data: { jobs: Job[] } }>(
    '/api/jobs'
  )
  const jobs = jobsData?.data?.jobs

  const applicationsData = useFetch<{
    success: boolean
    data: { applications: Application[] }
  }>('/api/applications')
  const applications = applicationsData?.data?.applications

  return (
    <main className="mx-auto my-6 max-w-7xl p-6">
      <Tabs defaultValue="jobs" className="max-w-[600px]">
        <TabsList>
          <TabsTrigger value="jobs" className="cursor-pointer">
            Jobs
          </TabsTrigger>
          <TabsTrigger value="application" className="cursor-pointer">
            Application
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} jobData={job} />)
          ) : (
            <div className="text-gray-500">
              No jobs available at the moment.
            </div>
          )}
        </TabsContent>
        <TabsContent value="application" className="space-y-4">
          {applications && applications.length > 0 ? (
            applications.map((app) => (
              <ApplicationCard key={app._id} appData={app} />
            ))
          ) : (
            <div className="text-gray-500">No applications.</div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default CandidateScreen
