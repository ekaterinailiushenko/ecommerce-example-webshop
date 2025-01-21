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

vi.mock('../firebaseConfig', () => ({
  getAuth: () => ({}),
}))
