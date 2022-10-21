import * as dotenv from 'dotenv'

// Read config
dotenv.config()

const config = {
  port: process.env.PORT ?? 8000,
  databaseUrl: process.env.DATABASE_URL ?? ''
}

export default config
