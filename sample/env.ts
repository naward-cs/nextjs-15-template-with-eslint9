import type {StandardSchemaV1} from '@standard-schema/spec'

import {createEnv} from '@t3-oss/env-nextjs'
import {z} from 'zod'

import {clientEnv} from './env-client'
import {serverEnv} from './env-server'


export const env = createEnv({
  extends: [serverEnv, clientEnv],
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
  // Tell the library when we're in a server context.
  isServer: typeof window === 'undefined',
  emptyStringAsUndefined: true,
  // Create a clean invalidator error for env variables
  // Called when the schema validation fails.
  onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
    console.error('❌ Invalid environment variables:', issues)
    throw new Error('Invalid environment variables')
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (variable: string) => {
    throw new Error(
      `❌ Attempted to access a server-side environment variable "${variable}" on the client`
    )
  },
  // Skip validation if any of these cases
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
