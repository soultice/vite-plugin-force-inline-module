import { defineConfig } from 'vite';
import { forceInlineModule } from 'vite-plugin-force-inline-module';

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [forceInlineModule({ inlineModules: ['import'] })],
  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      input: {
        'build1': './src/entry_point1.ts',
        'build2': './src/entry_point2.ts',
      },
      output: {
        minifyInternalExports: false,
        format: 'esm',
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
