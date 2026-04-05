# CloneMyVoice

AI Voice Cloning Platform for Creators

## Quick Start

```bash
# 1. Clone and setup
cd clonemyvoice

# 2. Start infrastructure
docker-compose up -d postgres redis

# 3. Setup API
cd apps/api
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma generate
npm run start:dev

# 4. Setup Web (new terminal)
cd apps/web
npm install
npm run dev

# 5. Setup Landing (new terminal)
cd apps/landing
npm install
npm run dev
```

## Project Structure

```
clonemyvoice/
├── apps/
│   ├── api/           # NestJS backend
│   ├── web/           # Next.js dashboard
│   └── landing/       # Next.js landing page
├── docker-compose.yml
└── README.md
```

## Environment Variables

See `apps/api/.env.example` for required variables.

## API Endpoints

- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/voices` - List voices
- `POST /api/v1/voices` - Create voice
- `POST /api/v1/voices/:id/generate` - Generate speech

## Tech Stack

- **Backend:** NestJS, Prisma, PostgreSQL, Redis
- **Frontend:** Next.js, Tailwind CSS, Framer Motion
- **AI:** ElevenLabs API
- **Billing:** Stripe

## License

MIT
