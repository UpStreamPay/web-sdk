// vite.config.js
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  optimizeDeps: {},
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: './src/index.ts',
      name: 'Purse',
      // the proper extensions will be added
      fileName: (moduleFormat, entryName) => {
        if (moduleFormat === 'es') {
          return 'index.esm.js';
        }
        return 'index.umd.js';
      },
      formats: ['es', 'umd'],
    },
    //rollupOptions: {
    //  // make sure to externalize deps that shouldn't be bundled
    //  // into your library
    //  external: ['vue'],
    //  output: {
    //    // Provide global variables to use in the UMD build
    //    // for externalized deps
    //    globals: {
    //      vue: 'Vue',
    //    },
    //  },
    //},
  },
  define: {},
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
});
