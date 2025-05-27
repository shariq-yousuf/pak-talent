import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useFetchData from '@/hooks/useFetchData'
import { useState } from 'react'
import ApplicationCard from '../ui/application-card'
import JobCard from '../ui/job-card'

const CandidateScreen = () => {
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
                isApplied={
                  !!applications?.find((app) => app.job._id === job._id)
                }
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
              <ApplicationCard
                key={app._id}
                appData={app}
                onDelete={handleRefetch}
              />
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
