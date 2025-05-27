import { cn } from '@/lib/utils'
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
import DeleteButton from './delete-button'

interface ApplicationCardProps {
  appData: Application
  variant?: 'candidate' | 'employer' | 'admin'
  className?: string
  onDelete?: () => void
}

const ApplicationCard: FC<ApplicationCardProps> = ({
  appData,
  variant = 'candidate',
  className,
  onDelete,
}) => {
  const { job, candidate, status, coverLetter, resume } = appData

  return (
    <Card className={cn(className, 'relative')}>
      {variant !== 'employer' && (
        <DeleteButton
          deleteUrl={`/api/applications/${appData._id}`}
          onDeleteSuccess={onDelete}
        />
      )}

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
          <a href={`/api/users/resume?path=${resume}`} target="_blank">
            <Button className="cursor-pointer">View Resume</Button>
          </a>
        )}
      </CardFooter>
    </Card>
  )
}

export default ApplicationCard
