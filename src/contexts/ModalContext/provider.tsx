import { useMemo, useState, useCallback } from 'react'

import { ModalContext } from './context'

const DEFAULT_FADE_DURATION = 300

const initialConfig: ModalContext.ModalConfig = {
  isOpen: false,
  content: null,
  fadeDuration: DEFAULT_FADE_DURATION,
}

export const ModalContextProvider = ({ children }: { children: Children }) => {
  const [config, setConfig] = useState(initialConfig)

  const openModal: ModalContext.Value['openModal'] = useCallback(
    ({ content, fadeDuration = DEFAULT_FADE_DURATION }) => {
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
