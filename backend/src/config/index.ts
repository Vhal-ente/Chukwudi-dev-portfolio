// src/config/index.ts - UPDATED FOR RESEND
import { z } from 'zod';

// ========== 1. SCHEMA DEFINITION ==========
const envSchema = z.object({
  // Required variables for Resend
  RESEND_API_KEY: z.string(),
  ALLOWED_ORIGIN: z.string(),
  
  // Optional variables with defaults
  PORT: z.coerce.number().default(10000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Optional feature flags
  ENABLE_AUTO_REPLY: z.coerce.boolean().default(true),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // Email addresses
  FROM_EMAIL: z.string().default('Portfolio Contact <contact@yourdomain.com>'),
  TO_EMAIL: z.string().default('valentinenwobi9@gmail.com'),
});

export type EnvConfig = z.infer<typeof envSchema>;

// ========== 2. VALIDATION & PARSING ==========
function parseEnv(): EnvConfig {
  // Check required variables first (simple check)
  const required = ['RESEND_API_KEY', 'ALLOWED_ORIGIN'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Configuration Error');
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('\n📋 Create a .env file with:');
    console.error('RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx');
    console.error('ALLOWED_ORIGIN=http://localhost:8080');
    console.error('PORT=10000');
    console.error('NODE_ENV=development');
    console.error('FROM_EMAIL=Portfolio Contact <contact@yourdomain.com>');
    console.error('TO_EMAIL=valentinenwobi9@gmail.com');
    throw new Error('Configuration incomplete');
  }
  
  // Parse with Zod (for defaults and type coercion)
  const envData = {
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN!,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ENABLE_AUTO_REPLY: process.env.ENABLE_AUTO_REPLY,
    LOG_LEVEL: process.env.LOG_LEVEL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    TO_EMAIL: process.env.TO_EMAIL,
  };
  
  const result = envSchema.safeParse(envData);
  
  if (!result.success) {
    console.error('❌ Configuration parsing error');
    console.error('Check your .env file values');
    throw new Error('Configuration parsing failed');
  }
  
  return result.data;
}

// ========== 3. CONFIG OBJECT WITH HELPERS ==========
const rawConfig = parseEnv();

export const config = {
  // Core config
  ...rawConfig,
  
  // Computed properties
  get isProduction(): boolean {
    return rawConfig.NODE_ENV === 'production';
  },
  
  get isDevelopment(): boolean {
    return rawConfig.NODE_ENV === 'development';
  },
  
  get serverUrl(): string {
    return this.isProduction 
      ? 'https://portfolio-backend-hesu.onrender.com'
      : `http://localhost:${rawConfig.PORT}`;
  },
  
  // Constants
  constants: {
    MAX_MESSAGE_LENGTH: 5000,
    RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: 10,
  },
} as const;

// ========== 4. TYPE EXPORTS ==========
export type AppConfig = typeof config;