import { formatWeight } from './formatWeight'

describe('formatWeight', () => {
  it('should convert provided weight (in grams) as an integer number to kilograms correctly', () => {
    expect(formatWeight(1305)).toBe('1.305')
  })

  it('should convert provided weight (in grams) and remove trailing zeros', () => {
    expect(formatWeight(3800)).toBe('3.8')
  })

  it('should return 0 when 0 is provided as weight (in grams) into the function', () => {
    expect(formatWeight(0)).toBe('0')
  })

  it('should return 49.999 when provided weight (in grams) exceeds the allowed maximum (49999g)', () => {
    expect(formatWeight(5080001)).toBe('49.999')
  })

  it('should return undefined if provided weight (in grams) is not an integer', () => {
    expect(formatWeight(12.345)).toBeUndefined()
  })

  it('should return undefined if provided weight (in grams) is negative', () => {
    expect(formatWeight(-1000)).toBeUndefined()
  })
})
