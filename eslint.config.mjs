//@ts-check
import * as path from 'node:path'

import { includeIgnoreFile } from '@eslint/compat'
import tseslint from 'typescript-eslint'

import { FlatCompat } from '@eslint/eslintrc'
import checkFilePlugin from 'eslint-plugin-check-file'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})


const restrictEnvAccess = tseslint.config(
  {
    ignores: ['**/env.ts'],
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message:
            "Use `import { env } from '@/configs/env'` instead to ensure validated types.",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'process',
          importNames: ['env'],
          message:
            "Use `import { env } from '@/configs/env'` instead to ensure validated types.",
        },
      ],
    },
  }
)

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
  {ignores: ['**/*.config.*', '.next/**']},
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  ...compat.config({
    extends: [ 'next/core-web-vitals', 'next/typescript', 'prettier' ],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'error',
      'import/consistent-type-specifier-style': [ 'error', 'prefer-top-level' ],
      /** typescript rules */
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/unbound-method': 'off',

      /** console  */
      'no-console': [ 'error', { allow: [ 'warn', 'error', 'info' ] } ],
    },
  }),
  {
    files: [ 'src/**/*', '**/*.js', '**/*.ts', '**/*.tsx' ],
    ignores: [ 'tests/**/*' ],
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

export default eslintConfig
