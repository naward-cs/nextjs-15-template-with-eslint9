/// <reference types="./eslint.config.d.ts" />
//@ts-check
/** @type {Awaited<import('typescript-eslint').Config>} */

import checkFilePlugin from 'eslint-plugin-check-file'

export default [
  {
    files: ['src/**/*'],
    plugins: {
      'check-file': checkFilePlugin,
    },
    rules: {
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
          'src/**/!(__tests__, ^[.*)': 'KEBAB_CASE',
        },
      ],
    },
  },
]
