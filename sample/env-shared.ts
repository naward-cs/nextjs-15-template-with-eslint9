// import type {StandardSchemaV1} from 'node_modules/zod/lib/standard-schema'

// import {createEnv} from '@t3-oss/env-nextjs'
// import {z} from 'zod'

// export const sharedEnv = createEnv({
//   shared: {
//     NODE_ENV: z.enum(['development', 'production']).default('development'),
//   },
//   runtimeEnv: {
//     NODE_ENV: process.env.NODE_ENV,
//   },
//   emptyStringAsUndefined: true,
//   // Create a clean invalidator error for env variables
//   // Called when the schema validation fails.
//   onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
//     console.error('❌ Invalid environment variables:', issues)
//     throw new Error('Invalid environment variables')
//   },
//   // Skip validation if any of these cases
//   skipValidation:
//     !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
// })
