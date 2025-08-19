// eslint.config.js (The final CommonJS version)

const js = require("@eslint/js");
const globals = require("globals");
const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

module.exports = [
    // THIS IS THE MOST IMPORTANT PART.
    // IT STOPS ESLINT FROM LOOKING IN THE 'dist' FOLDER.
    {
        ignores: ["dist/"],
    },

    // All your other configurations and rules go below.
    js.configs.recommended,
    ...compat.extends("airbnb-base", "prettier"),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                L: "readonly",
                Chart: "readonly",
                ChartDataLabels: "readonly",
            },
        },
        rules: {
            "no-console": "off",
            "no-unused-vars": "off",
            "import/prefer-default-export": "off",
            "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
            "import/no-extraneous-dependencies": [
                "error",
                { devDependencies: true },
            ],
        },
    },
];
