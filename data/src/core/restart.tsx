import { spawnSync } from 'child_process';

export function restartSite() {
  spawnSync('git pull', { shell: true, stdio: 'inherit' });
}
