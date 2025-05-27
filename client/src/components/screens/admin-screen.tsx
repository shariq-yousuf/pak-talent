import useFetchData from '@/hooks/useFetchData'
import { useState } from 'react'
import ApplicationCard from '../ui/application-card'
import JobCard from '../ui/job-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import UserCard from '../ui/user-card'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState('jobs')
  const [reFetch, setRefetch] = useState(Date.now())

  const { jobs, applications, users } = useFetchData(
    ['job', 'application', 'user'],
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
              <JobCard
                key={job._id}
                jobData={job}
                variant="admin"
                onDelete={handleRefetch}
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
                variant="admin"
                onDelete={handleRefetch}
              />
            ))
          ) : (
            <div className="text-gray-500">No applications.</div>
          )}
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user._id}
                userData={user}
                onDelete={handleRefetch}
              />
            ))
          ) : (
            <div className="text-gray-500">No users.</div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default AdminScreen
