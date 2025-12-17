// src/config/env.ts - WORKING VERSION
import { z } from 'zod';

// Define schema
const envSchema = z.object({
  EMAIL_USER: z.string()
    .min(1, 'EMAIL_USER is required'),
    
  EMAIL_PASSWORD: z.string()
    .min(1, 'EMAIL_PASSWORD is required'),
    
  PORT: z.coerce.number()
    .min(1, 'PORT must be at least 1')
    .max(65535, 'PORT cannot exceed 65535')
    .default(5000),
    
  ALLOWED_ORIGIN: z.string()
    .default('http://localhost:3000'),
    
  NODE_ENV: z.enum(['development', 'production', 'test'])
    .default('development'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  // Use safeParse to avoid try/catch and ZodError issues
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    // Handle validation errors - TYPE SAFE approach
    console.error('❌ Environment validation failed:');
    
    for (const issue of result.error.issues) {
      // Safe way to access path - handle both string and symbol
      const pathStr = issue.path.map(p => 
        typeof p === 'symbol' ? p.toString() : String(p)
      ).join('.');
      
      // Get current value safely
      const envKey = issue.path[0];
      const currentValue = envKey && typeof envKey === 'string' 
        ? process.env[envKey] 
        : 'unknown';
      
      console.error(`  • ${pathStr}: ${issue.message} (current: "${currentValue || 'not set'}")`);
    }
    
    console.error('\n💡 Required .env configuration:');
    console.error(`
EMAIL_USER=valentinenwobi9@gmail.com
EMAIL_PASSWORD=your-16-character-gmail-app-password
ALLOWED_ORIGIN=http://localhost:3000
PORT=5000
NODE_ENV=development
    `);
    
    console.error('\n🔧 Gmail App Password Setup:');
    console.error('   Visit: https://myaccount.google.com/apppasswords');
    console.error('   1. Enable 2-Step Verification');
    console.error('   2. Create App Password for "Mail"');
    console.error('   3. Use the 16-character password');
    
    throw new Error('Invalid environment configuration');
  }
  
  return result.data;
}

// Singleton config instance
let cachedConfig: EnvConfig | null = null;

export function getConfig(): EnvConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnv();
  }
  return cachedConfig;
}