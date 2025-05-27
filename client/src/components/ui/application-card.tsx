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
  variant?: 'candidate' | 'employer'
  className?: string
}

const ApplicationCard: FC<ApplicationCardProps> = ({
  appData,
  variant = 'candidate',
  className,
}) => {
  const { job, candidate, status, coverLetter, resume } = appData

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {variant === 'candidate' ? job.title : candidate?.username}
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
          <a href={`/users/resume?path=${resume}`}>
            <Button>View Resume</Button>
          </a>
        )}
      </CardFooter>
    </Card>
  )
}

export default ApplicationCard
