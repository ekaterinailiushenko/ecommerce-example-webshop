import { createContext, type ReactNode } from 'react'

export namespace ModalContext {
  export interface Value {
    config: ModalConfig
    closeModal: () => void
    openModal: (args: Pick<ModalContext.ModalConfig, 'content' | 'fadeDuration'>) => void
  }

  export interface ModalConfig {
    isOpen: boolean
    content: ReactNode

    fadeDuration?: number
  }
}

export const ModalContext = createContext<ModalContext.Value | null>(null)
