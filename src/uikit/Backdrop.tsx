import classNames from 'classnames'

export const Backdrop = ({
  children,
  onClick,
  isOpen,
}: {
  children: React.ReactNode
  onClick: () => void
  isOpen: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'fixed inset-0 flex justify-center items-center transition-colors z-50',
        isOpen ? 'visible bg-black/75' : 'invisible'
      )}
    >
      {children}
    </div>
  )
}
