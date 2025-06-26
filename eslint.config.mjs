//@ts-check
import * as path from 'node:path'

import { includeIgnoreFile } from '@eslint/compat'

import { FlatCompat } from '@eslint/eslintrc'
import { pluginCheckFile } from './eslint-checkfile.mjs'
import { restrictEnvAccess } from './eslint-restricted-env.mjs'
import { eslintRules } from './eslint-rules.mjs'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  includeIgnoreFile(path.join(import.meta.dirname, '.gitignore')),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { ignores: [ '**/*.config.*', '.next/**' ] },
  { files: [ '**/*.{js,mjs,cjs,ts,jsx,tsx}' ] },
  ...compat.config({
    extends: [ 'next/core-web-vitals', 'next/typescript', 'prettier' ],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'error',
      'import/consistent-type-specifier-style': [ 'error', 'prefer-top-level' ],

    },
  }),
  ...eslintRules,
  ...pluginCheckFile,
  ...restrictEnvAccess,
]

export default eslintConfig
