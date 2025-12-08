const { defineConfig } = require("cypress");
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.broadleafcommerce.org",

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
        return launchOptions;
      });

      on("task", {
        lighthouse: lighthouse(),
        pa11y: pa11y(),          // task name "pa11y", calls pa11y()
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
  },
});