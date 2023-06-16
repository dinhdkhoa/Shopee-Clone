import { useRef } from 'react'
import { toast } from 'react-toastify'

const IMAGE_MAX_SIZE = 1048576

interface Props {
  onChange: (file?: File) => void
}

export default function UploadImage({ onChange }: Props) {
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromEvent = event.target.files?.[0]
    if (fileFromEvent && (fileFromEvent.size >= IMAGE_MAX_SIZE || !fileFromEvent.type.includes('image'))) {
      toast.warning('Dung lượng file tối đa 1 MB - Định dạng:.JPEG, .PNG')
    } else {
      onChange && onChange(fileFromEvent)
    }
  }

  const handleUpload = () => {
    avatarInputRef.current?.click()
  }
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={avatarInputRef}
        onChange={handleFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)}
      />
      <button
        type='button'
        onClick={handleUpload}
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Choose Image
      </button>
    </>
  )
}
