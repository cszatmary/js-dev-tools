import { spawn } from 'child_process';

export default async function(
  useYarn: boolean,
  dependencies: string[],
  dir: string,
): Promise<void> {
  const packageManager = useYarn ? 'yarn' : 'npm';
  const args = useYarn
    ? ['add', ...dependencies, '-D']
    : ['install', ...dependencies, '--save-dev'];

  return new Promise<void>((resolve, reject) => {
    const child = spawn(packageManager, args, { stdio: 'inherit', cwd: dir });
    child.on('close', code => {
      if (code !== 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ command: `${packageManager} ${args.join(' ')}` });
      }

      return resolve();
    });
  });
}
