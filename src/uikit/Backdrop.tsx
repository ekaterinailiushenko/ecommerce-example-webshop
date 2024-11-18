import classNames from 'classnames'

export const Backdrop = ({
  children,
  onClick,
  isVisible,
}: {
  children: Children
  onClick: () => void
  isVisible: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'fixed inset-0 flex justify-center items-center transition-colors z-50',
        isVisible ? 'visible bg-black/75' : 'invisible'
      )}
    >
      {children}
    </div>
  )
}
