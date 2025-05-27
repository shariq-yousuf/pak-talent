import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFetch } from '@/hooks/useFetch'
import type { Application, Job } from '@/types'
import ApplicationCard from '../ui/application-card'
import JobCard from '../ui/job-card'
import { useState } from 'react'

const CandidateScreen = () => {
  const [activeTab, setActiveTab] = useState('jobs')

  const jobsData = useFetch<{ success: boolean; data: { jobs: Job[] } }>(
    '/api/jobs',
    activeTab
  )
  const jobs = jobsData?.data?.jobs

  const applicationsData = useFetch<{
    success: boolean
    data: { applications: Application[] }
  }>('/api/applications', activeTab)
  const applications = applicationsData?.data?.applications

  const handleChangeTab = (value: string) => {
    setActiveTab(value)
  }

  return (
    <main className="mx-auto my-6 max-w-7xl p-6">
      <Tabs
        value={activeTab}
        onValueChange={handleChangeTab}
        className="max-w-[600px]"
      >
        <TabsList>
          <TabsTrigger value="jobs" className="cursor-pointer">
            All Jobs
          </TabsTrigger>
          <TabsTrigger value="applications" className="cursor-pointer">
            My Jobs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                jobData={job}
                isApplied={!!applications?.find((app) => app.job._id === job._id)}
              />
            ))
          ) : (
            <div className="text-gray-500">
              No jobs available at the moment.
            </div>
          )}
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
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
