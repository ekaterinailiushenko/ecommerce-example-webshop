import { type Logger, logger } from './logger'

const message = 'hello'

describe('logger', () => {
  const logMethods = [
    { method: 'log', spy: vi.spyOn(logger, 'log') },
    { method: 'warn', spy: vi.spyOn(logger, 'warn') },
    { method: 'error', spy: vi.spyOn(logger, 'error') },
  ]

  afterEach(() => {
    vi.clearAllMocks()
  })

  logMethods.forEach(({ method, spy }) => {
    it(`should call console.${method} with the correct message"`, () => {
      logger[method as keyof Logger](message)

      expect(spy).toHaveBeenCalledWith(message)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
