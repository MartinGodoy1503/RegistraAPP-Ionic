exports.config = {
    allScriptsTimeout: 11000,
    specs: ['./e2e/**/*.e2e-spec.ts'],
    capabilities: {
      browserName: 'chrome',
    },
    directConnect: true,
    baseUrl: 'http://localhost:8100/',
    framework: 'jasmine',
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000,
    },
    onPrepare: () => {
      require('ts-node').register({
        project: './e2e/tsconfig.e2e.json',
      });
    },
  };
  