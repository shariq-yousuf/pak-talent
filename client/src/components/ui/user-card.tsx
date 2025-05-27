import { cn } from '@/lib/utils'
import type { User } from '@/types'
import type { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './card'
import DeleteButton from './delete-button'

interface UserCardProps {
  userData: User
  className?: string
  onDelete?: () => void
}

const UserCard: FC<UserCardProps> = ({ userData, className, onDelete }) => {
  const { username, email, role } = userData

  return (
    <Card className={cn(className, 'relative')}>
      <DeleteButton
        deleteUrl={`/api/users/${userData._id}`}
        onDeleteSuccess={onDelete}
      />

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
