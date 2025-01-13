import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import failOnConsole from 'vitest-fail-on-console'

failOnConsole()

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
