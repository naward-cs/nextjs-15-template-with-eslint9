import {createEnv} from '@t3-oss/env-nextjs'
import {z, ZodError} from 'zod'

/**
 * By default, this library will feed the environment variables directly to
 * the Zod validator.
 *
 * This means that if you have an empty string for a value that is supposed
 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
 * it as a type mismatch violation. Additionally, if you have an empty string
 * for a value that is supposed to be a string with a default value (e.g.
 * `DOMAIN=` in an ".env" file), the default value will never be applied.
 *
 * In order to solve these issues, we recommend that all new projects
 * explicitly specify this option as true.
 */

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    // SERVERVAR: z.string(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // SERVERVAR: process.env.SERVERVAR,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  emptyStringAsUndefined: true,
  // Create a clean invalidator error for env variables
  onValidationError: (error: ZodError) => {
    console.error(
      '❌ Invalid environment variables:',
      error.flatten().fieldErrors
    )
    process.exit(1)
  },
  // Skip validation if any of these cases
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
