// import {fileURLToPath} from 'url'
import type {NextConfig} from 'next'

// /** uncomment if using a env file */
// import {createJiti} from 'jiti'

// //* Import env files to validate at build time. Use jiti so we can load .ts files in here. */
// await createJiti(fileURLToPath(import.meta.url)).import('./src/configs/env')

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: {ignoreDuringBuilds: true},
  typescript: {ignoreBuildErrors: true},
}

export default nextConfig
