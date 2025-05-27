import { Trash2Icon } from 'lucide-react'
import type { FC } from 'react'

interface DeleteButtonProps {
  deleteUrl: string
  onDeleteSuccess?: () => void
}

const DeleteButton: FC<DeleteButtonProps> = ({
  deleteUrl,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      onDeleteSuccess?.()
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  return (
    <button
      className="absolute top-4 right-4 cursor-pointer"
      onClick={handleDelete}
    >
      <Trash2Icon className="text-gray-700 transition-colors duration-300 hover:text-red-600" />
    </button>
  )
}

export default DeleteButton
