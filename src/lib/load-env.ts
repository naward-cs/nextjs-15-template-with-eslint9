//if your project requires to load environment variables outside next dev and next start
//For example, use this file when using drizzle-orm
//  by adding import '@/lib/load-env' in the top of your migration file or seeding file
import {loadEnvConfig} from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
