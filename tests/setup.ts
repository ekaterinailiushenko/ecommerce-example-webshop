import { afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import failOnConsole from 'vitest-fail-on-console'

failOnConsole()

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
