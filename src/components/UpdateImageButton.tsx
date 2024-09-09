import { useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export const UpdateImageButton = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <div>
      <input
        type="file"
        name="image"
        ref={fileInput}
        multiple={false}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <button
        className="flex items-center gap-2 bg-green-100 hover:bg-green-500 rounded-lg py-2 px-4 text-green-500 hover:text-white font-semibold transition-colors duration-200"
        onClick={() => fileInput.current?.click()}
      >
        <AiOutlinePlus />
        <p>Add Photo</p>
      </button>
    </div>
  )
}
