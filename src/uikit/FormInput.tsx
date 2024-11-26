import classNames from 'classnames'

import { Container } from './Container'

export namespace FormInput {
  export interface Props {
    label: string
    htmlFor: string
    type: string
    id: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus: () => void

    required?: boolean
    className?: string
  }
}

const labelStylePreset = 'block text-sm font-medium text-gray-700'

const inputStylePreset = classNames(
  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm',
  'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
)

export const FormInput = ({
  label,
  htmlFor,
  type,
  id,
  value,
  onChange,
  onFocus,
}: FormInput.Props) => {
  return (
    <Container>
      <label htmlFor={htmlFor} className={labelStylePreset}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        required
        className={inputStylePreset}
      />
    </Container>
  )
}
