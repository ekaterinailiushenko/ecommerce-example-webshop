import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import failOnConsole from 'vitest-fail-on-console'

import type * as CartApiModule from '../src/api/cartApi'

failOnConsole()

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

vi.mock('../src/api/cartApi', () => {
  const mock: typeof CartApiModule = {
    cartApi: {
      clearCart: vi.fn(),
      getCartSummary: vi.fn(),
      addProductToCart: vi.fn(),
      deleteProductFromCart: vi.fn(),
    },
  }

  return mock
})

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual,
    getAuth: vi.fn(() => ({
      onAuthStateChanged: vi.fn(callback => {
        callback(null)
        return () => {}
      }),
      signInWithEmailAndPassword: vi.fn(),
      signOut: vi.fn(),
    })),
  }
})

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}))

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({})),
}))
