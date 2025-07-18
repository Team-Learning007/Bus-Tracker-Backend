import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    unstubEnvs: true,
    globals: true,
    coverage: {
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        'src/types/**',
        '**/*.d.ts',
        '**/*.config.js',
      ],
    },
  },
});
