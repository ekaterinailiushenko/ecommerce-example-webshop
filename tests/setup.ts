import '../src/i18n/config'
import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import failOnConsole from 'vitest-fail-on-console'

failOnConsole()

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.clearAllTimers()
})

vi.mock('../src/api/cartApi')

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

vi.mock('firebase/app', async () => {
  const actual = await vi.importActual('firebase/app')

  return { ...actual, initializeApp: vi.fn() }
})

vi.mock('firebase/storage', async () => {
  const actual = await vi.importActual('firebase/storage')

  return { ...actual, getStorage: vi.fn(() => ({})) }
})

/**
 * ResizeObserver is always present in the browser but is not available in JSDOM test environment.
 */
vi.stubGlobal(
  'ResizeObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
)
