import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFetch } from '@/hooks/useFetch'
import type { Application, Job } from '@/types'

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
    <main className="my-6 max-w-7xl p-6">
      <Tabs defaultValue="jobs" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="jobs" className="cursor-pointer">
            Jobs
          </TabsTrigger>
          <TabsTrigger value="application" className="cursor-pointer">
            Application
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">No jobs available at the moment.</TabsContent>
        <TabsContent value="application">No application.</TabsContent>
      </Tabs>
    </main>
  )
}

export default CandidateScreen
