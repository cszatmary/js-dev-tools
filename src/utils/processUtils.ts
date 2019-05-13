import chalk from 'chalk';

export function logError(message?: any, ...optionalParams: any[]): void {
  console.error(chalk.red(message, ...optionalParams));
}

export function logSuccess(message?: any, ...optionalParams: any[]): void {
  console.log(chalk.green(message, ...optionalParams));
}

export function exitFailure(
  message?: any,
  statusCode: number = 1,
  ...optionalParams: any[]
): void {
  logError(message, ...optionalParams);
  process.exit(statusCode);
}

export function exitSuccess(message?: any, ...optionalParams: any[]): void {
  logSuccess(message, ...optionalParams);
  process.exit(0);
}

export const cwd = (): string => process.env.INIT_CWD || process.cwd();
