/* eslint-disable no-console */

export type LogFn = (message?: unknown, ...optionalParams: unknown[]) => void

export interface Logger {
  log: LogFn
  warn: LogFn
  error: LogFn
}

const isDev = process.env.NODE_ENV !== 'production'

export const logger: Logger = {
  log: isDev ? console.log.bind(console) : () => {},
  warn: isDev ? console.warn.bind(console) : () => {},
  error: isDev ? console.error.bind(console) : () => {},
}

/* eslint-enable no-console */
