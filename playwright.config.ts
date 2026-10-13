import { defineConfig } from '@playwright/test';
const remoteUrl = process.env['DEMO_BASE_URL'];
export default defineConfig({
  testDir: './tests', fullyParallel: true, workers: 2, reporter: 'list',
  use: { baseURL: remoteUrl || 'http://127.0.0.1:8086', channel: 'chrome', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  ...(remoteUrl ? {} : { webServer: { command: 'bun run dev', url: 'http://127.0.0.1:8086', reuseExistingServer: !process.env['CI'], timeout: 60000 } }),
});
