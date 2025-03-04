export const formatWeight = (weight: number) => {
  if (weight === 0) {
    return '0'
  }

  if (!Number.isInteger(weight) || weight < 0) {
    return undefined
  }

  return (weight / 1000).toString()
}
