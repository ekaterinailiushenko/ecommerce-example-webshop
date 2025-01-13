import { type Logger, logger } from './logger'

const message = 'hello'

describe('logger', () => {
  const logMethods = [
    { method: 'log', spy: vi.spyOn(logger, 'log').mockImplementation(vi.fn()) },
    { method: 'warn', spy: vi.spyOn(logger, 'warn').mockImplementation(vi.fn()) },
    { method: 'error', spy: vi.spyOn(logger, 'error').mockImplementation(vi.fn()) },
  ]

  logMethods.forEach(({ method, spy }) => {
    it(`should call console.${method} with the correct message`, () => {
      logger[method as keyof Logger](message)

      expect(spy).toHaveBeenCalledWith(message)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
