/* eslint-disable no-console */

export type LogFn = (message?: unknown, ...optionalParams: unknown[]) => void

export interface Logger {
  log: LogFn
  warn: LogFn
  error: LogFn
}

const isDev = process.env.NODE_ENV !== 'production'

export const logger: Logger = {
  log: (message, ...optionalParams) => {
    if (isDev) {
      console.log(message, ...optionalParams)
    }
  },
  warn: (message, ...optionalParams) => {
    if (isDev) {
      console.warn(message, ...optionalParams)
    }
  },
  error: (message, ...optionalParams) => {
    if (isDev) {
      console.error(message, ...optionalParams)
    }
  },
}

/* eslint-enable no-console */
