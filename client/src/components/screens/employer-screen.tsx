import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFetch } from '@/hooks/useFetch'
import type { Application, Job } from '@/types'
import ApplicationCard from '../ui/application-card'
import JobCard from '../ui/job-card'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const EmployerScreen = () => {
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
      <div className="my-4">
        <Link to="/add-job">
          <Button className="cursor-pointer">Post New Job</Button>
        </Link>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleChangeTab}
        className="max-w-[600px]"
      >
        <TabsList>
          <TabsTrigger value="jobs" className="cursor-pointer">
            Your Jobs
          </TabsTrigger>
          <TabsTrigger value="application" className="cursor-pointer">
            Applications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} jobData={job} variant='employer'/>)
          ) : (
            <div className="text-gray-500">No jobs.</div>
          )}
        </TabsContent>
        <TabsContent value="application" className="space-y-4">
          {applications && applications.length > 0 ? (
            applications.map((app) => (
              <ApplicationCard key={app._id} appData={app} variant="employer" />
            ))
          ) : (
            <div className="text-gray-500">No applications.</div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default EmployerScreen
