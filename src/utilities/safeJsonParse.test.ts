import { logger } from './logger'
import { safeJsonParse } from './safeJsonParse'

vi.mock('./logger', () => ({
  logger: {
    error: vi.fn(),
  },
}))

describe('safeJsonParse', () => {
  it('should parse a valid JSON string and return the object', () => {
    const json = '{"key": "value"}'
    const result = safeJsonParse<{ key: string }>(json)

    expect(result).toEqual({ key: 'value' })
  })

  it('should parse a valid JSON string with an array', () => {
    const json = '[1, 2, 3]'
    const result = safeJsonParse<number[]>(json)

    expect(result).toEqual([1, 2, 3])
  })

  it('should return null for an invalid JSON string and log the error', () => {
    const invalidJson = '{key: value}'
    const result = safeJsonParse(invalidJson)

    expect(result).toBeNull()
    expect(logger.error).toHaveBeenCalledWith(expect.stringMatching(/Error in safeJsonParse:/))
  })

  it('should return null for an empty string and log the error', () => {
    const emptyJson = ''
    const result = safeJsonParse(emptyJson)

    expect(result).toBeNull()
    expect(logger.error).toHaveBeenCalledWith(expect.stringMatching(/Error in safeJsonParse:/))
  })
})
