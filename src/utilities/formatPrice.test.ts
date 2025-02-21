import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('should format 0 correctly', () => {
    expect(formatPrice(0)).toEqual('0,00 €')
  })

  it('should format a large number correctly', () => {
    expect(formatPrice(123456789)).toEqual('1.234.567,89 €')
  })

  it('should format a negative number correctly', () => {
    expect(formatPrice(-123)).toEqual('-1,23 €')
  })

  it('should format a small positive number correctly', () => {
    expect(formatPrice(84)).toEqual('0,84 €')
  })
})
