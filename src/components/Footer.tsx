import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-center bg-gray-100">
      <p className="text-xs p-4 text-gray-500">
        {t('footer.buildVersion', { version: __APP_VERSION__ })}
      </p>
    </div>
  )
}
