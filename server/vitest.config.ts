import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/tests/**/*.test.ts"], // <-- match your actual test files
    setupFiles: ["./src/tests/setup.ts"],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
