# CloneMyVoice - Technical Design Document

**Project:** CloneMyVoice - AI Voice Platform for Creators  
**Date:** 5 April 2026  
**Status:** Technical Design Phase

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Web App    │  │  Landing     │  │   Mobile (future)    │  │
│  │   (Next.js)  │  │   (Next.js)  │  │   (React Native)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                               │
│                     (NestJS + Fastify)                           │
├─────────────────────────────────────────────────────────────────┤
│  Auth    │  Voice    │  Billing   │  Integrations  │  Queue     │
│  Module  │  Module   │  Module    │  Module        │  (BullMQ)  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐  ┌──────────────┐  ┌─────────────────┐
│   PostgreSQL    │  │    Redis     │  │   11labs API    │
│   (Prisma)      │  │   (BullMQ)   │  │   (Voice)       │
└─────────────────┘  └──────────────┘  └─────────────────┘
```

---

## 📊 Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Users & Authentication
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String    // hashed
  name          String?
  avatar        String?   // URL to avatar image
  role          UserRole  @default(CREATOR)
  status        UserStatus @default(ACTIVE)
  
  // Billing
  stripeCustomerId String?
  subscription  Subscription?
  credits       Int       @default(0)
  
  // Relations
  voices        Voice[]
  generations   Generation[]
  integrations  PlatformIntegration[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum UserRole {
  CREATOR
  ADMIN
  AGENCY
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

// Subscription Plans
model Subscription {
  id              String           @id @default(uuid())
  userId          String           @unique
  user            User             @relation(fields: [userId], references: [id])
  
  plan            SubscriptionPlan
  status          SubscriptionStatus @default(ACTIVE)
  
  // Limits
  maxVoices       Int
  maxGenerations  Int              // per month
  features        String[]         // JSON array of feature flags
  
  // Billing
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

enum SubscriptionPlan {
  STARTER
  PRO
  AGENCY
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
}

// Voice Clones
model Voice {
  id              String    @id @default(uuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  name            String    // Display name (e.g., "My Professional Voice")
  elevenLabsId    String    @unique // 11labs voice ID
  
  // Source files
  samples         VoiceSample[]
  
  // Settings
  settings        Json?     // { stability: 0.5, similarity_boost: 0.75, ... }
  
  // Status
  status          VoiceStatus @default(TRAINING)
  
  // Usage
  generationCount Int       @default(0)
  lastUsedAt      DateTime?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model VoiceSample {
  id          String   @id @default(uuid())
  voiceId     String
  voice       Voice    @relation(fields: [voiceId], references: [id], onDelete: Cascade)
  
  fileUrl     String   // S3/Storage URL
  duration    Float    // seconds
  fileSize    Int      // bytes
  
  createdAt   DateTime @default(now())
}

enum VoiceStatus {
  TRAINING
  READY
  ERROR
  DISABLED
}

// Voice Generations
model Generation {
  id              String           @id @default(uuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id])
  voiceId         String
  voice           Voice            @relation(fields: [voiceId], references: [id])
  
  // Input
  text            String
  settings        Json?            // { stability, similarity_boost, style, ... }
  
  // Output
  audioUrl        String?          // Generated audio file URL
  duration        Float?           // seconds
  
  // Status
  status          GenerationStatus @default(PENDING)
  errorMessage    String?
  
  // Usage tracking
  creditsUsed     Int              @default(1)
  
  // Queue tracking
  jobId           String?          // BullMQ job ID
  
  createdAt       DateTime         @default(now())
  completedAt     DateTime?
}

enum GenerationStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

// Platform Integrations (DM auto-reply)
model PlatformIntegration {
  id              String   @id @default(uuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  
  platform        Platform // INSTAGRAM, TWITTER, TELEGRAM, etc.
  
  // OAuth tokens (encrypted)
  accessToken     String   // encrypted
  refreshToken    String?  // encrypted
  tokenExpiresAt  DateTime?
  
  // Settings
  settings        Json?    // { autoReply: true, replyDelay: 5, ... }
  
  // Status
  status          IntegrationStatus @default(PENDING)
  lastSyncAt      DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@unique([userId, platform])
}

enum Platform {
  INSTAGRAM
  TWITTER
  TELEGRAM
  WHATSAPP
  EMAIL
}

enum IntegrationStatus {
  PENDING
  CONNECTED
  DISCONNECTED
  ERROR
}

// Credit Transactions
model CreditTransaction {
  id          String   @id @default(uuid())
  userId      String
  
  type        TransactionType
  amount      Int      // positive = added, negative = used
  
  // Reference
  generationId String?
  description  String?
  
  createdAt   DateTime @default(now())
}

enum TransactionType {
  PURCHASE
  USAGE
  BONUS
  REFUND
  SUBSCRIPTION
}
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

### Voices
```
GET    /api/v1/voices                    # List user's voices
POST   /api/v1/voices                    # Create new voice (upload samples)
GET    /api/v1/voices/:id                # Get voice details
PATCH  /api/v1/voices/:id                # Update voice settings
DELETE /api/v1/voices/:id                # Delete voice
POST   /api/v1/voices/:id/generate      # Generate speech (sync or async)
```

### Generations
```
GET    /api/v1/generations               # List generations
GET    /api/v1/generations/:id           # Get generation (with audio URL)
DELETE /api/v1/generations/:id           # Delete generation
```

### Billing & Credits
```
GET    /api/v1/billing/subscription      # Current subscription
POST   /api/v1/billing/checkout          # Create checkout session
POST   /api/v1/billing/portal            # Customer portal
GET    /api/v1/billing/credits           # Credit balance & history
POST   /api/v1/billing/credits/buy       # Buy credits
```

### Integrations
```
GET    /api/v1/integrations              # List connected platforms
POST   /api/v1/integrations/:platform/connect    # OAuth connect
POST   /api/v1/integrations/:platform/disconnect # Disconnect
PATCH  /api/v1/integrations/:platform/settings   # Update settings
```

---

## 🎨 Frontend Structure (Next.js App Router)

```
apps/web/
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   │   ├── page.tsx             # Dashboard home
│   │   │   ├── voices/
│   │   │   │   ├── page.tsx         # Voice list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx     # Upload voice samples
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # Voice detail + generate
│   │   │   ├── generations/
│   │   │   │   └── page.tsx         # History
│   │   │   ├── integrations/
│   │   │   │   └── page.tsx         # Connect platforms
│   │   │   ├── billing/
│   │   │   │   └── page.tsx         # Subscription & credits
│   │   │   └── settings/
│   │   │       └── page.tsx         # Profile settings
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx               # Root layout
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── voice/
│   │   │   ├── VoiceCard.tsx
│   │   │   ├── VoiceUploader.tsx
│   │   │   ├── VoicePlayer.tsx
│   │   │   └── GenerationForm.tsx
│   │   ├── billing/
│   │   │   ├── CreditDisplay.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   └── SubscriptionStatus.tsx
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── DashboardShell.tsx
│   ├── lib/
│   │   ├── api.ts                   # API client (axios/fetch)
│   │   ├── auth.ts                  # Auth utilities
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useVoices.ts
│   │   ├── useGenerations.ts
│   │   └── useCredits.ts
│   └── store/
│       └── auth-store.ts            # Zustand auth state
├── public/
│   └── audio/                       # Static audio assets
└── package.json
```

---

## 🎭 Landing Page Structure

```
apps/landing/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Main landing page
│   │   ├── layout.tsx
│   │   └── waitlist/
│   │       └── page.tsx             # Waitlist signup
│   ├── sections/
│   │   ├── Hero.tsx                 # Headline + CTA + demo player
│   │   ├── Problem.tsx              # "Too many DMs..."
│   │   ├── Solution.tsx             # How it works (3 steps)
│   │   ├── Demo.tsx                 # Interactive voice demo
│   │   ├── Features.tsx             # Feature grid
│   │   ├── Pricing.tsx              # Pricing table
│   │   ├── Testimonials.tsx         # Social proof
│   │   └── FAQ.tsx
│   └── components/
│       ├── VoiceDemoPlayer.tsx      # Interactive demo
│       ├── WaitlistForm.tsx
│       └── PricingCard.tsx
```

---

## 🚀 11labs Integration

### Voice Cloning Flow
```typescript
// 1. Upload samples → 11labs creates voice
const voice = await elevenlabs.voices.addSharingVoice({
  voice_name: "Creator Name",
  voice_description: "Professional, friendly tone",
  files: [sample1, sample2, sample3], // 10-30 min total
});

// 2. Store voice ID in database
await db.voice.create({
  elevenLabsId: voice.voice_id,
  status: 'READY',
});

// 3. Generate speech
const audio = await elevenlabs.generate({
  voice: voice.voice_id,
  text: "Hello fans! Thanks for your message...",
  model_id: "eleven_multilingual_v2",
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.3,
  },
});
```

### Queue System (BullMQ)
```typescript
// For async generation
const generationQueue = new Queue('voice-generation');

// Add job
generationQueue.add('generate', {
  generationId: 'uuid',
  voiceId: 'elevenlabs-voice-id',
  text: 'Text to speak',
  settings: { stability: 0.5, ... },
});

// Worker processor
const worker = new Worker('voice-generation', async (job) => {
  const { generationId, voiceId, text, settings } = job.data;
  
  // Update status
  await db.generation.update({ id: generationId, status: 'PROCESSING' });
  
  try {
    // Call 11labs
    const audio = await elevenlabs.generate({ voice: voiceId, text, ...settings });
    
    // Upload to S3
    const url = await s3.upload(audio);
    
    // Update generation
    await db.generation.update({
      id: generationId,
      status: 'COMPLETED',
      audioUrl: url,
    });
  } catch (error) {
    await db.generation.update({
      id: generationId,
      status: 'FAILED',
      errorMessage: error.message,
    });
  }
});
```

---

## 💳 Billing Integration (Stripe)

### Subscription Flow
```typescript
// Create checkout session
const session = await stripe.checkout.sessions.create({
  customer: user.stripeCustomerId,
  line_items: [{
    price: 'price_pro_monthly',
    quantity: 1,
  }],
  mode: 'subscription',
  success_url: `${APP_URL}/billing?success=true`,
  cancel_url: `${APP_URL}/billing?canceled=true`,
});

// Webhook handler
app.post('/webhooks/stripe', async (req, res) => {
  const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  
  if (event.type === 'invoice.payment_succeeded') {
    // Update subscription, add credits
    await handlePaymentSuccess(event.data.object);
  }
  
  if (event.type === 'customer.subscription.deleted') {
    // Downgrade to free
    await handleSubscriptionCanceled(event.data.object);
  }
});
```

---

## 📁 Project Structure

```
clonemyvoice/
├── apps/
│   ├── api/                 # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── voices/
│   │   │   ├── generations/
│   │   │   ├── billing/
│   │   │   ├── integrations/
│   │   │   ├── queue/
│   │   │   ├── prisma/
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── web/                 # Next.js dashboard
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── landing/             # Next.js landing page
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── Dockerfile
│
├── packages/
│   ├── shared/              # Shared types, utils
│   └── ui/                  # Shared UI components
│
├── docker-compose.yml       # Local dev stack
├── turbo.json              # Monorepo config
└── package.json            # Root workspace
```

---

## 🎯 MVP Checklist

### Week 1: Foundation
- [ ] Project setup (monorepo, Docker)
- [ ] Database schema + Prisma setup
- [ ] Auth system (register/login/JWT)

### Week 2: Core Voice Features
- [ ] 11labs API integration
- [ ] Voice upload & cloning
- [ ] Text-to-speech generation
- [ ] Audio playback in browser

### Week 3: Billing & UI
- [ ] Stripe integration
- [ ] Credit system
- [ ] Dashboard UI (voices list, generate form)
- [ ] Generation history

### Week 4: Polish & Launch
- [ ] Landing page
- [ ] Waitlist system
- [ ] Error handling & logging
- [ ] Deploy to staging

---

*Document created: 5 April 2026*
