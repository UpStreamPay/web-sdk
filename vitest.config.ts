import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // Runs tsc over the `*.test-d.ts` files: CI does not run `npm run typecheck`, so this is what
    // catches a loader type that drifts from the generated SDK types.
    typecheck: {
      enabled: true,
    },
  },
});
