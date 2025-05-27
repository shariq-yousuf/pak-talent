import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFetch } from '@/hooks/useFetch'
import type { Application, Job } from '@/types'
import ApplicationCard from '../ui/application-card'
import Tag from '../ui/tag'

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
            jobs.map((job) => (
              <Card key={job._id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="font-semibold">Tags: </span>
                      {job.tags && job.tags.length > 0 ? (
                        job.tags.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)
                      ) : (
                        <span className="text-gray-400">No tags</span>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold">Type: </span>
                      <span className="text-gray-700">{job.type}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Deadline: </span>
                      <span className="text-gray-700">
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Salary: </span>{' '}
                      <span className="text-gray-700">{job.salary}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
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
