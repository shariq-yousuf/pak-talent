import type { Job } from '@/types'
import type { FC } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import Tag from './tag'

interface JobCardProps {
  jobData: Job
}

const JobCard: FC<JobCardProps> = ({ jobData }) => {
  const { title, description, salary, type, tags, deadline } = jobData
  return (
    <Card>
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
      </CardContent>
    </Card>
  )
}

export default JobCard
