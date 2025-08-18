import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/tests/**/*.test.ts"],
    setupFiles: ["./src/tests/setup.ts"],
    testTimeout: 30000,
    hookTimeout: 30000,
    // run all suites in a single worker, in order
    poolOptions: { threads: { singleThread: true } },
    sequence: { concurrent: false },
  },
});
