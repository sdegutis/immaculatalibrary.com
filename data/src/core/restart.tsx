import { spawnSync } from 'child_process';

export function pullChangesFromGithub() {
  console.log('pullChangesFromGithub(): starting...');
  spawnSync('git pull', { shell: true, stdio: 'inherit' });
  console.log('pullChangesFromGithub(): done');
}
