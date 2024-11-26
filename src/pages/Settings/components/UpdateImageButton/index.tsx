import { useRef } from 'react'

import en from '../../../../i18n/en.json'
import { Button } from '../../../../uikit'

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
      <Button
        variant="light"
        icon="plus"
        size="small"
        label={en.profile.buttons.changeImage.title}
        onClick={() => fileInput.current?.click()}
      />
    </div>
  )
}
