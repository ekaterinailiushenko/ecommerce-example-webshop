import en from '../i18n/en.json'

export const Footer = () => (
  <div className="flex justify-center bg-gray-100">
    <p className="text-xs p-4 text-gray-500">
      {en.footer.buildVersion} {__APP_VERSION__}
    </p>
  </div>
)
