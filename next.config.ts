// import {fileURLToPath} from 'url'
import type {NextConfig} from 'next'

import {env as envConfigs} from '@/configs/env'

/**
 * uncomment if using a next.config.js vice next.config.ts and wanting to have env file and
 * Import env files to validate at dev and build time. Use jiti only if using next.config.js so it can load .ts files in here.
 * must install jiti
 * ```pnpm install -D jiti```
 * */
// import {createJiti} from 'jiti'
// await createJiti(fileURLToPath(import.meta.url)).import('./src/configs/env')
// ** importing environmentals to validate on dev and build time. ** //
// import {env as envConfigs} from '@/configs/env'
/** two options when handling env, one is seperated and another is together,
 * refer to https://env.t3.gg/docs/nextjs why you might seperate
 * sample of seperation is located in /sample/ folder
 **/

const _env = envConfigs //load to force ESM
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: {ignoreDuringBuilds: true},
  typescript: {ignoreBuildErrors: true},
}

export default nextConfig
