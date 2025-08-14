module.exports = {
    extends: [
        'airbnb-base', // Airbnb's base JavaScript style guide
        'prettier'
    ],
    env: {
        browser: true, // Enable browser global variables
        node: true,   // Disable Node.js global variables
        es6: true,     // Enable ES6 features
    },
    parserOptions: {
        ecmaVersion: 2021, // Use latest ECMAScript version
        sourceType: 'module', // Allow ES modules
    },
    rules: {
      //  Add custom rules/overrides here if needed
        'no-console': 'off', // Allow console.log (common in development)
        'import/prefer-default-export': 'off', // Allow single named exports
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // Allow i++ in for loops
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },
};