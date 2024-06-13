export const formatPrice = (price: string | undefined) => {
  if (price?.length === 1) return `0,0${price}`
  if (price?.length === 2) return `0,${price}`
  const integerPart = price?.slice(0, -2)
  const decimalPart = price?.slice(-2)
  return `${integerPart},${decimalPart}`
}
