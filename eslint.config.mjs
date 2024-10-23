/// <reference types="./eslint.config.d.ts" />
//@ts-check
import * as path from 'node:path'

import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import checkFilePlugin from 'eslint-plugin-check-file'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
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

const baseConfig = tseslint.config(
  includeIgnoreFile(path.join(import.meta.dirname, './.gitignore')),
  {ignores: ['**/*.config.*']},
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      import: importPlugin,
      'check-file': checkFilePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      /** General eslint rules */
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      /** Lint rules for typescript */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {prefer: 'type-imports', fixStyle: 'separate-type-imports'},
      ],
      '@typescript-eslint/no-misused-promises': [
        2,
        {checksVoidReturn: {attributes: false}},
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      /** Lint rules for file stucture */
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js, tx, jsx, tsx, md}': 'KEBAB_CASE',
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
          '!(**/__tests__)/**/*': 'KEBAB_CASE',
        },
      ],
      /** Console management */
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
    },
  },
  {
    linterOptions: {reportUnusedDisableDirectives: true},
    languageOptions: {parserOptions: {projectService: true}},
  }
)

const reactConfig = [
  {
    files: ['**/*.{js,cjs, mjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      /** Default recommended Rules */
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      /** Lint rules for React */
      ...reactPlugin.configs['jsx-runtime'].rules,
      /** Lint rules for React-hooks */
      ...hooksPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {React: 'writable'},
    },
  },
]

const nextConfig = [
  {
    ignores: ['.next/**'],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      /** Lint rules for nextjs */
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'error',
    },
  },
]

export default [
  /** Default recommended eslint and typescript rules */
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  /** uncomment if using t3-env */
  ...restrictEnvAccess,
]
