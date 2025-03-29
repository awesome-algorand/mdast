import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

import { defineConfig } from 'vite';

// Plugins
import { analyzer } from 'vite-bundle-analyzer';
import { codecovVitePlugin } from '@codecov/vite-plugin';
import dts from 'vite-plugin-dts';

// Constants
import pkg from './package.json';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    process.env.ANALYZE ? analyzer() : undefined,
    dts({ tsconfigPath: './tsconfig.app.json' }),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: '@awesome-algorand/mdast',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  resolve: {
    alias: {
      [pkg.name]: resolve(__dirname, './src'),
      [`${pkg.name}/content`]: resolve(__dirname, './src/content'),
      [`${pkg.name}/links`]: resolve(__dirname, './src/links'),
      [`${pkg.name}/object`]: resolve(__dirname, './src/object'),
      [`${pkg.name}/root`]: resolve(__dirname, './src/root'),
    },
  },
  build: {
    minify: false,
    sourcemap: true,
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    outDir: 'lib',
    rollupOptions: {
      external: Object.keys(pkg.dependencies),
      input: Object.fromEntries(
        glob
          .sync('src/**/*.ts', {
            ignore: [
              '**/test/**',
              '**/*.test.ts',
              '**/*.fixtures.ts',
              '**/*.spec.ts',
              '**/*.bench.ts',
            ],
          })
          .map((file) => {
            return [
              relative(
                'src',
                file.slice(0, file.length - extname(file).length),
              ),
              fileURLToPath(new URL(file, import.meta.url)),
            ];
          }),
      ),
      output: {
        esModule: true,
        compact: false,
        preserveModules: true,
        entryFileNames: '[name].js',
      },
    },
  },
  test: {
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'istanbul',
      exclude: [
        '**/lib/**',
        '**/docs/**',
        'src/**/**.bench.ts',
        'main.ts',
        'vite.config.ts',
        'vite-env.d.ts',
      ],
    },
    browser: {
      enabled: false,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' },
      ],
    },
  },
});
