export const logger = {
    warn: (message: string, ...args: any[]) => console.warn(message, ...args),
    error: (message: string, ...args: any[]) => console.error(message, ...args),
    info: (message: string, ...args: any[]) => console.info(message, ...args),
    debug: (message: string, ...args: any[]) => console.debug(message, ...args),
    log: (message: string, ...args: any[]) => console.log(message, ...args),
    trace: (message: string, ...args: any[]) => console.trace(message, ...args),
}