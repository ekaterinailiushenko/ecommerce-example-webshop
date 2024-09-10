/* eslint-disable no-console */

export interface LogFn {
  (message?: unknown, ...optionalParams: unknown[]): void
}

export interface Logger {
  log: LogFn
  warn: LogFn
  error: LogFn
}

export const logger: Logger = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
}

/* eslint-enable no-console */
