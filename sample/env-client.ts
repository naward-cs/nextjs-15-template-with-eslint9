// import type {StandardSchemaV1} from 'node_modules/zod/lib/standard-schema'

// import {createEnv} from '@t3-oss/env-nextjs'

// // import {z} from 'zod'

// export const clientEnv = createEnv({
//   /**
//    * Specify your client-side environment variables schema here.
//    * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
//    */
//   client: {
//     // NEXT_PUBLIC_CLIENTVAR: z.string(),
//   },
//   /**
//    * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
//    */
//   runtimeEnv: {
//     // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
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
