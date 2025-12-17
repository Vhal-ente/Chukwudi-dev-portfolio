// src/config/index.ts - COMPLETE WORKING VERSION
import { z } from 'zod';

// ========== 1. SCHEMA DEFINITION ==========
const envSchema = z.object({
  // Required variables
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
  ALLOWED_ORIGIN: z.string(),
  
  // Optional variables with defaults
  PORT: z.coerce.number().default(10000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Optional feature flags
  ENABLE_AUTO_REPLY: z.coerce.boolean().default(true),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export type EnvConfig = z.infer<typeof envSchema>;

// ========== 2. VALIDATION & PARSING ==========
function parseEnv(): EnvConfig {
  // Check required variables first (simple check)
  const required = ['EMAIL_USER', 'EMAIL_PASSWORD', 'ALLOWED_ORIGIN'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Configuration Error');
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('\n📋 Create a .env file with:');
    console.error('EMAIL_USER=valentinenwobi9@gmail.com');
    console.error('EMAIL_PASSWORD=xxxx xxxx xxxx xxxx');
    console.error('ALLOWED_ORIGIN=http://localhost:3000');
    console.error('PORT=10000');
    console.error('NODE_ENV=development');
    throw new Error('Configuration incomplete');
  }
  
  // Parse with Zod (for defaults and type coercion)
  const envData = {
    EMAIL_USER: process.env.EMAIL_USER!,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD!,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN!,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ENABLE_AUTO_REPLY: process.env.ENABLE_AUTO_REPLY,
    LOG_LEVEL: process.env.LOG_LEVEL,
  };
  
  const result = envSchema.safeParse(envData);
  
  if (!result.success) {
    console.error('❌ Configuration parsing error');
    // Simple error display without complex ZodError handling
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
      ? 'https://your-backend-url.com'
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