import { cn } from '@/lib/utils'
import type { FC } from 'react'

interface TagProps {
  children?: React.ReactNode
  className?: string
}

const Tag: FC<TagProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'mr-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700',
        className
      )}
    >
      {children}
    </span>
  )
}

export default Tag
