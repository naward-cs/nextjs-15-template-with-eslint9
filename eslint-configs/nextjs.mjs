/// <reference types="./eslint.config.d.ts" />
//@ts-check
/** @type {Awaited<import('typescript-eslint').Config>} */

import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
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
