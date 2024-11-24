module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine'],
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-jasmine-html-reporter',
      ],
      client: {
        clearContext: false,
      },
      browsers: ['ChromeHeadless'],
      singleRun: true,
      restartOnFileChange: true,
      reporters: ['progress', 'kjhtml'],
    });
  };
  