import type { Application } from '@/types'
import type { FC } from 'react'
import { Button } from './button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

interface ApplicationCardProps {
  appData: Application
  variant?: 'candidate' | 'employer' | 'admin'
  className?: string
}

const ApplicationCard: FC<ApplicationCardProps> = ({
  appData,
  variant = 'candidate',
  className,
}) => {
  const { job, candidate, status, coverLetter, resume } = appData
  const isProd = import.meta.env.PROD
  const baseUrl = import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL
  const resumeLink = `${isProd ? 'https' : 'http'}://${baseUrl}/users/resume?path=${resume}`

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {variant === 'candidate'
            ? job.title
            : `Candidate: ${candidate?.username}`}
        </CardTitle>
        <CardDescription>
          <span className="font-semibold">Cover Letter</span>:{' '}
          {coverLetter ? coverLetter : 'N/A'}
        </CardDescription>
      </CardHeader>
      <CardFooter className="space-y-4">
        {variant === 'candidate' ? (
          <p>Status: {status}</p>
        ) : (
          <a href={resumeLink} target="_blank">
            <Button className="cursor-pointer">View Resume</Button>
          </a>
        )}
      </CardFooter>
    </Card>
  )
}

export default ApplicationCard
