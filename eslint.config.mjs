import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import jest from 'eslint-plugin-jest'
export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        ignores: ['dist/**'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,

    {
        files: [
            '**/*.test.{js,ts,mjs,mts,cjs,cts}',
            '**/__tests__/**/*.{js,ts,mjs,mts,cjs,cts}',
        ],
        plugins: { jest },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest, // <-- makes describe/it/expect defined
            },
        },
        rules: {
            'jest/valid-expect': 'error',
        },
    },
])
