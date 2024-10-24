/// <reference types="./eslint-configs/eslint.config.d.ts" />
//@ts-check
import baseConfig, {restrictEnvAccess} from './eslint-configs/base.mjs'
import checkFileConfig from './eslint-configs/check-file.mjs'
import nextConfig from './eslint-configs/nextjs.mjs'
import reactConfig from './eslint-configs/reactjs.mjs'

export default [
  /** Default recommended eslint and typescript rules */

  ...baseConfig,
  ...checkFileConfig,
  ...reactConfig,
  ...nextConfig,
  /** uncomment if using t3-env */
  ...restrictEnvAccess,
]
