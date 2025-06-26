
import checkFilePlugin from 'eslint-plugin-check-file'

export const pluginCheckFile = [
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
]