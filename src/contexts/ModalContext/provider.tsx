import { type ReactNode, useMemo, useState, useCallback } from 'react'

import { ModalContext } from './context'

const initialConfig: ModalContext.ModalConfig = {
  isOpen: false,
  content: null,
  fadeDuration: 300,
}

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState(initialConfig)

  const openModal: ModalContext.Value['openModal'] = useCallback(
    ({ content, fadeDuration = 300 }) => {
      setConfig({
        content,
        fadeDuration,
        isOpen: true,
      })
    },
    []
  )

  const closeModal = useCallback(() => {
    setConfig(prev => ({ ...prev, isOpen: false }))
  }, [])

  const value = useMemo(() => {
    const obj: ModalContext.Value = {
      config,
      openModal,
      closeModal,
    }
    return obj
  }, [config, openModal, closeModal])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
