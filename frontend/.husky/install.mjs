import { execFileSync } from 'node:child_process';

if (process.env.HUSKY !== '0' && process.env.CI !== 'true') {
  execFileSync('git', ['config', 'core.hooksPath', '.husky'], {
    stdio: 'inherit',
  });
}
