import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // Aquí puedes configurar eventos si es necesario
    },
  },
});
