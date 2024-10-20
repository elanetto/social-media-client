// eslint.config.js
/** @type {import('eslint').Linter.Config} */
module.exports = [
    {
      languageOptions: {
        globals: {
          browser: true,
          "cypress/globals": true,
        },
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
        },
      },
      // Extending recommended ESLint rules directly
      rules: {
        // Add any general rules you want to apply
      },
    },
    {
      files: ["**/*.cy.js"],
      languageOptions: {
        globals: {
          "cypress/globals": true,
        },
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
        },
      },
      plugins: ["cypress"],
      rules: {
        "cypress/no-unnecessary-waiting": "off",
        "no-unused-vars": "off",
      },
    },
  ];