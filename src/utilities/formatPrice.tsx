export const formatPrice = (price: number) => {
  if (!Number.isInteger(price)) {
    return undefined
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / 100)
}
