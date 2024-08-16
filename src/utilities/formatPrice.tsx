export const formatPrice = (price: number | undefined) => {
  if (price === undefined) return '0,00'

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / 100)
}
