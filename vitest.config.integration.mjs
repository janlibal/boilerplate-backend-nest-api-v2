import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.test.ts'],
    threads: false,
    maxConcurrency: 1,
    environment: 'node',
    setupFiles: ['test/helpers/setup.ts'],
  },
  plugins: [
    swc.vite({module: { type: 'es6' },}),
  ],
})