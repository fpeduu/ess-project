import { defineConfig } from "cypress";

export default defineConfig({
  cucumber: {
    features: "./cypress/features",
    stepDefinitions: "./cypress/stepDefinitions",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
