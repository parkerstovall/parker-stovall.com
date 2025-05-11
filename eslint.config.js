import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js, pluginReact },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPrettier,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
])
