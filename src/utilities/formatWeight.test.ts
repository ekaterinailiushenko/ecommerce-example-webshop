import { formatWeight } from './formatWeight'

describe('formatWeight', () => {
  test('should convert grams to kilograms correctly', () => {
    expect(formatWeight(1000)).toBe('1')
    expect(formatWeight(2500)).toBe('2.5')
    expect(formatWeight(500)).toBe('0.5')
  })

  test('should return "0" when weight is 0', () => {
    expect(formatWeight(0)).toBe('0')
  })

  test('should handle large numbers correctly', () => {
    expect(formatWeight(1000000)).toBe('1000')
  })

  test('should handle decimal values', () => {
    expect(formatWeight(1234)).toBe('1.234')
    expect(formatWeight(999)).toBe('0.999')
  })
})
