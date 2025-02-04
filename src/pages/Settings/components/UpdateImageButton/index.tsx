import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../../uikit'

export const UpdateImageButton = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const { t } = useTranslation()

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
        label={t('profile.buttons.changeImage.title')}
        onClick={() => fileInput.current?.click()}
      />
    </div>
  )
}
