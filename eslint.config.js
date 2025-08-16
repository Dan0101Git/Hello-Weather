// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// This part is needed to make the old Airbnb config work
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// The main configuration
export default [
    // Use the recommended default rules from ESLint
    js.configs.recommended,

    // Load your old "extends" using the compatibility tool
    ...compat.extends("airbnb-base", "prettier"),

    // Apply your custom settings
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                L: "readonly",
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
