//@ts-check
import * as path from 'node:path'

import {includeIgnoreFile} from '@eslint/compat'
import pluginJs from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import checkFilePlugin from 'eslint-plugin-check-file'
import reactPlugin from 'eslint-plugin-react'
import reactHookPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * All packages that leverage t3-env should use this rule
 */
const restrictEnvAccess = tseslint.config(
  {ignores: ['**/env.ts']},
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message:
            "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'process',
          importNames: ['env'],
          message:
            "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
    },
  }
)

export default [
  // Ignore files not tracked by VCS and any config files
  includeIgnoreFile(path.join(import.meta.dirname, '.gitignore')),
  {ignores: ['**/*.config.*', '.next/**']},
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {files: ['**/*.{{js,mjs,}'], ...tseslint.configs.disableTypeChecked},
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHookPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      /** Lint rules for reactjs */
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHookPlugin.configs.recommended.rules,
      /** Lint rules for nextjs */
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'error',
    },
    languageOptions: {
      globals: {
        React: 'writable',
      },
    },
  },
  {
    files: ['src/**/*', '**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      'check-file': checkFilePlugin,
    },
    rules: {
      /** Lint rules for file stucture */
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{jsx,tsx}': 'KEBAB_CASE',
          '**/*.{js,ts}': 'KEBAB_CASE',
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          // all folders within src (except __tests__)should be named in kebab-case
          // 'src/**/!(__tests__)': 'KEBAB_CASE',
          '!^[.*': 'KEBAB_CASE',
          '!(__tests__)': 'KEBAB_CASE',
        },
      ],
    },
  },
  ...restrictEnvAccess,
]
