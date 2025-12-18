// src/server.ts - COMPLETE WORKING VERSION
import express, { Express, Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { config } from './config'; // Fixed import path

// Type imports (create these if they don't exist)
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ==================== MIDDLEWARE ====================
const app: Express = express();

// CORS configuration
app.use(cors({
  origin: config.ALLOWED_ORIGIN,
  credentials: true,
}));

// JSON body parsing
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  // Add response time tracking
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${method} ${url} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// ==================== EMAIL TRANSPORTER ====================
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,  
  auth: {
    user: 'apikey',  
    pass: process.env.EMAIL_PASSWORD  
  },

  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

// Verify transporter on startup
transporter.verify((error: Error | null) => {
  if (error) {
    console.error(`❌ Email configuration error: ${error.message}`);
    
    // Don't exit in development for easier testing
    if (config.isProduction) {
      console.error('Email service is required for production.');
      // Consider whether to exit - maybe just log and continue
      // process.exit(1);
    }
  } else {
    console.log('✅ Email server is ready to send messages.');
  }
});

// ==================== RATE LIMITING ====================
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = config.constants.RATE_LIMIT_WINDOW_MS;
const MAX_REQUESTS_PER_WINDOW = config.constants.RATE_LIMIT_MAX_REQUESTS;

const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { 
      count: 1, 
      resetTime: now + RATE_LIMIT_WINDOW_MS 
    });
    return next();
  }
  
  const record = requestCounts.get(ip)!;
  
  // Reset counter if window has passed
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
    requestCounts.set(ip, record);
    return next();
  }
  
  // Check if limit exceeded
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    res.setHeader('Retry-After', retryAfter.toString());
    
    res.status(429).json({ 
      success: false, 
      error: 'Too many requests. Please try again later.',
      retryAfter: `${retryAfter} seconds`,
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Increment counter
  record.count++;
  requestCounts.set(ip, record);
  next();
};

// ==================== REQUEST VALIDATION ====================
const validateContactRequest = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, subject, message } = req.body;
  
  // Check required fields
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    res.status(400).json({ 
      success: false, 
      error: 'All fields (name, email, subject, message) are required.',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ 
      success: false, 
      error: 'Please provide a valid email address.',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Validate lengths using constants
  const MAX_NAME_LENGTH = 100;
  const MAX_SUBJECT_LENGTH = 200;
  const MAX_MESSAGE_LENGTH = config.constants.MAX_MESSAGE_LENGTH;
  
  if (name.length > MAX_NAME_LENGTH) {
    res.status(400).json({ 
      success: false, 
      error: `Name must be less than ${MAX_NAME_LENGTH} characters.`,
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  if (subject.length > MAX_SUBJECT_LENGTH) {
    res.status(400).json({ 
      success: false, 
      error: `Subject must be less than ${MAX_SUBJECT_LENGTH} characters.`,
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ 
      success: false, 
      error: `Message must be less than ${MAX_MESSAGE_LENGTH} characters.`,
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Sanitize input
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.subject = subject.trim();
  req.body.message = message.trim();
  
  next();
};

// ==================== API ROUTES ====================

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'portfolio-contact-api',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    version: '1.0.0',
  });
});

// Development-only config endpoint
app.get('/api/config', (req: Request, res: Response) => {
  if (config.NODE_ENV !== 'development') {
    res.status(404).json({ 
      error: 'Not found',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Return safe configuration info (no passwords)
  res.json({
    environment: config.NODE_ENV,
    port: config.PORT,
    allowedOrigin: config.ALLOWED_ORIGIN,
    emailUser: config.EMAIL_USER ? 'configured' : 'not configured',
    enableAutoReply: config.ENABLE_AUTO_REPLY,
    logLevel: config.LOG_LEVEL,
    timestamp: new Date().toISOString(),
  });
});

// Main contact endpoint
app.post('/api/contact', 
  rateLimitMiddleware, 
  validateContactRequest, 
  async (req: Request<{}, {}, ContactFormData>, res: Response) => {
    
  const { name, email, subject, message } = req.body;
  
  try {
    // Prepare email to yourself (portfolio owner)
    const ownerMailOptions = {
      from: `"Portfolio Contact" <{valentinenwobi9@gmail.com}>`,
      to: config.EMAIL_USER,
      replyTo: email,
      subject: `📨 Portfolio Contact: ${subject}`,
      text: `
New message from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from your portfolio contact form at ${new Date().toISOString()}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">📨 New Portfolio Message</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #eee;">
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <p><strong>👤 Name:</strong> ${name}</p>
      <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
      <p><strong>📝 Subject:</strong> ${subject}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #555;">Message:</h3>
      <div style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
      <p>Sent from your portfolio contact form</p>
      <p><a href="mailto:${email}" style="color: #667eea;">Reply to ${name}</a></p>
    </div>
  </div>
</div>
      `,
    };

    // Send email to yourself
    await transporter.sendMail(ownerMailOptions);
    
    // Send auto-reply to sender (if enabled)
    if (config.ENABLE_AUTO_REPLY) {
      try {
        const userMailOptions = {
          from: `"Valentine Nwobi" <${config.EMAIL_USER}>`,
          to: email,
          subject: `Thanks for your message: ${subject}`,
          text: `
Hello ${name},

Thank you for reaching out through my portfolio website!

I've received your message regarding "${subject}" and will review it shortly. I typically respond within 24-48 hours.

Best regards,
Valentine Nwobi
Full-Stack Developer

---
This is an automated confirmation.
          `,
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; color: white;">
    <h1 style="margin: 0;">✉️ Message Received</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hello <strong>${name}</strong>,</p>
    <p>Thank you for reaching out through my portfolio website!</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <p>I've received your message regarding <strong>"${subject}"</strong> and will review it shortly.</p>
      <p>I typically respond within <strong>24-48 hours</strong>.</p>
    </div>
    
    <p>Best regards,<br>
    <strong>Valentine Nwobi</strong><br>
    Full-Stack Developer</p>
  </div>
</div>
          `,
        };
        
        await transporter.sendMail(userMailOptions);
        console.log(`✅ Auto-reply sent to: ${email}`);
      } catch (autoReplyError) {
        console.warn(`⚠️ Could not send auto-reply:`, autoReplyError);
        // Continue even if auto-reply fails
      }
    }
    
    console.log(`📨 Contact form submitted: ${name} <${email}>`);
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully!',
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ Email send error:', error);
    
    // User-friendly error messages
    let userMessage = 'Failed to send your message. Please try again in a few minutes.';
    
    if (error.code === 'EAUTH') {
      userMessage = 'Email service configuration error.';
    } else if (error.code === 'EENVELOPE') {
      userMessage = 'Invalid email address.';
    }
    
    res.status(500).json({ 
      success: false, 
      error: userMessage,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('🚨 Unhandled error:', error);
  
  res.status(500).json({
    success: false,
    error: config.isProduction ? 'Internal server error' : error.message,
    timestamp: new Date().toISOString(),
  });
});

// ==================== SERVER STARTUP ====================
const PORT = config.PORT;
const HOST = '0.0.0.0'; // Required for Render

// Graceful shutdown handlers
const gracefulShutdown = () => {
  console.log('Shutting down gracefully...');
  
  transporter.close();
  
  setTimeout(() => {
    console.log('Force shutdown');
    process.exit(1);
  }, 10000).unref();
  
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`
🚀 ${config.NODE_ENV.toUpperCase()} SERVER STARTED
─────────────────────────────────────
✅ Host: ${HOST}
✅ Port: ${PORT}
✅ Environment: ${config.NODE_ENV}
✅ Allowed Origin: ${config.ALLOWED_ORIGIN}
✅ Auto-reply: ${config.ENABLE_AUTO_REPLY ? 'Enabled' : 'Disabled'}
✅ Health Check: http://${HOST}:${PORT}/api/health
─────────────────────────────────────
  `);
});