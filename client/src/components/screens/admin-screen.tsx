import useFetchData from '@/hooks/useFetchData'
import { useState } from 'react'
import ApplicationCard from '../ui/application-card'
import JobCard from '../ui/job-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import UserCard from '../ui/user-card'

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState('jobs')
  const { jobs, applications, users } = useFetchData(
    ['job', 'application', 'user'],
    activeTab
  )

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
            All Applications
          </TabsTrigger>
          <TabsTrigger value="users" className="cursor-pointer">
            All Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job._id} jobData={job} variant="admin" />
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
              <ApplicationCard key={app._id} appData={app} variant="admin" />
            ))
          ) : (
            <div className="text-gray-500">No applications.</div>
          )}
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          {users && users.length > 0 ? (
            users.map((user) => <UserCard key={user._id} userData={user} />)
          ) : (
            <div className="text-gray-500">No users.</div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default AdminScreen
