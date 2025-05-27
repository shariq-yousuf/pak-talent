import type { User } from '@/types'
import type { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './card'

interface UserCardProps {
  userData: User
  className?: string
}

const UserCard: FC<UserCardProps> = ({ userData, className }) => {
  const { username, email, role } = userData

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>User Name: {username}</CardTitle>
        <CardDescription className="mt-4 space-y-1">
          <div>
            <span className="font-bold">Email: </span>
            {email}
          </div>
          <div>
            <span className="font-bold">Role: </span>
            {role}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default UserCard
