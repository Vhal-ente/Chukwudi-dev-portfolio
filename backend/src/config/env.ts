// src/config/env.ts - MINIMAL WORKING VERSION
import { z } from 'zod';

const envSchema = z.object({
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
  ALLOWED_ORIGIN: z.string(),
  PORT: z.coerce.number().default(10000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error('❌ Environment validation failed');
    
    // Simple error output without complex path handling
    console.error('Errors:', JSON.stringify(result.error.format(), null, 2));
    
    console.error('\n💡 Check your .env file has:');
    console.error('EMAIL_USER, EMAIL_PASSWORD, ALLOWED_ORIGIN');
    
    throw new Error('Invalid environment configuration');
  }
  
  return result.data;
}

export function getConfig(): EnvConfig {
  return validateEnv();
}