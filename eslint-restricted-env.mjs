import tseslint from 'typescript-eslint'
export const restrictEnvAccess = tseslint.config(
  {
    ignores: [ '**/env.ts', '**/env-*.ts' ],
  },
  {
    files: [ '**/*.js', '**/*.ts', '**/*.tsx' ],
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
          importNames: [ 'env' ],
          message:
            "Use `import { env } from '@/configs/env'` instead to ensure validated types.",
        },
      ],
    },
  }
)