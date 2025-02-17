const MAX_WEIGHT = 49999

export const formatWeight = (weight: number) => {
  if (weight === 0) {
    return '0'
  }

  if (weight > MAX_WEIGHT) {
    return (MAX_WEIGHT / 1000).toString()
  }

  if (!Number.isInteger(weight) || weight < 0) {
    return undefined
  }

  return (weight / 1000).toString()
}
