import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useFetchData from '@/hooks/useFetchData'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ApplicationCard from '../ui/application-card'
import { Button } from '../ui/button'
import JobCard from '../ui/job-card'

const EmployerScreen = () => {
  const [activeTab, setActiveTab] = useState('jobs')
  const [reFetch, setRefetch] = useState(Date.now())

  const { jobs, applications } = useFetchData(
    ['job', 'application'],
    [activeTab, reFetch]
  )

  const handleChangeTab = (value: string) => {
    setActiveTab(value)
  }

  const handleRefetch = () => {
    setRefetch(Date.now())
  }

  return (
    <main className="mx-auto my-6 max-w-7xl p-6">
      <div className="my-4">
        <Link to="/jobs/create">
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
            jobs.map((job) => (
              <JobCard
                key={job._id}
                jobData={job}
                variant="employer"
                onDelete={handleRefetch}
              />
            ))
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
