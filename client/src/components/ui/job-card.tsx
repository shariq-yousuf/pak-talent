import type { Job } from '@/types'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import DeleteButton from './delete-button'
import Tag from './tag'

interface JobCardProps {
  jobData: Job
  variant?: 'employer' | 'candidate' | 'admin'
  isApplied?: boolean
  onDelete?: () => void
}

const JobCard: FC<JobCardProps> = ({
  jobData,
  variant = 'candidate',
  isApplied,
  onDelete,
}) => {
  const { title, description, salary, type, tags, deadline } = jobData

  return (
    <Card className="relative">
      {variant !== 'candidate' && (
        <DeleteButton
          deleteUrl={`/api/jobs/${jobData._id}`}
          onDeleteSuccess={onDelete}
        />
      )}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">Tags: </span>
            {tags && tags.length > 0 ? (
              tags.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)
            ) : (
              <span className="text-gray-400">No tags</span>
            )}
          </div>
          <div>
            <span className="font-semibold">Type: </span>
            <span className="text-gray-700">{type}</span>
          </div>
          <div>
            <span className="font-semibold">Deadline: </span>
            <span className="text-gray-700">
              {new Date(deadline).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-semibold">Salary: </span>{' '}
            <span className="text-gray-700">{salary}</span>
          </div>
        </div>
        {variant === 'candidate' && (
          <CardFooter className="mt-6">
            <Link to={`/apply/${jobData._id}`} className="ml-auto">
              <Button className="cursor-pointer" disabled={isApplied}>
                {isApplied ? 'Applied' : 'Apply'}
              </Button>
            </Link>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  )
}

export default JobCard
