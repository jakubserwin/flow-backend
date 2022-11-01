import * as dotenv from 'dotenv'

// Read config
dotenv.config()

const config = {
  port: process.env.PORT ?? 8000,
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  emailUserame: process.env.EMAIL_USERNAME ?? '',
  emailPassword: process.env.EMAIL_PASSWORD ?? ''
}

export default config
