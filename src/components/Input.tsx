import { useState } from 'react'

export const Input = ({
  onChangeCallback,
}: {
  onChangeCallback?: (value: string) => void
}) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)

    onChangeCallback && onChangeCallback(inputValue)
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Search by name..."
      className="md:w-96 bg-searchbar p-2 pl-4 rounded-3xl shadow-sm placeholder:text-white placeholder:text-sm placeholder:opacity-50 focus:outline-none focus:shadow-outline focus:bg-white"
    />
  )
}
