import { logger } from './logger'

export const safeJsonParse = <T>(json: string): T | null => {
  try {
    const parsed = JSON.parse(json) as T

    return parsed
  } catch (error) {
    logger.error(`Error in safeJsonParse: ${error}`)

    return null
  }
}
