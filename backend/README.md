# PiggyCapsule Backend API

A NestJS-based backend for PiggyCapsule - a shared digital savings platform with time-locked goals, video memories, and group accountability.

## Features

- 🔐 **Authentication**: Phone/Email signup with OTP verification
- 💰 **Piggy Banks**: Create shared savings goals with time-locks
- 📹 **Video Memories**: Mandatory videos for accountability and contributions
- 👥 **Group Management**: Add/remove members, ownership controls
- 💸 **Contributions**: Paystack integration for deposits
- 🔒 **Withdrawals**: Time-locked with unanimous approval system
- 📱 **Notifications**: Firebase Cloud Messaging integration (TODO)
- 🎬 **Memory Timeline**: Chronological video playback

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Payments**: Paystack
- **Video Storage**: Cloudinary
- **Cache/Jobs**: Redis + BullMQ (TODO)
- **Notifications**: Firebase Cloud Messaging (TODO)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Redis server (optional for now)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.example` to `.env` and update with your credentials:
   ```bash
   cp .env.example .env
   ```

   Update the following values:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A random secure string
   - `CLOUDINARY_*`: Your Cloudinary credentials
   - `PAYSTACK_*`: Your Paystack API keys
   - Firebase credentials (optional for now)
   - SMS provider credentials (optional for now)

3. **Run database migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

5. **Start the development server**:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/signup` - Register new user
  ```json
  {
    "phone": "+2348012345678",
    "email": "user@example.com",
    "password": "securePassword123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

- `POST /auth/verify-otp` - Verify OTP and get JWT tokens
  ```json
  {
    "phone": "+2348012345678",
    "code": "123456"
  }
  ```

- `POST /auth/login` - Login with credentials
  ```json
  {
    "phone": "+2348012345678",
    "password": "securePassword123"
  }
  ```

- `POST /auth/refresh` - Refresh access token (requires Authorization header)

### Piggy Banks

All endpoints require `Authorization: Bearer <token>` header

- `POST /piggy-banks` - Create new piggy bank
  ```json
  {
    "name": "Vacation Fund",
    "goalAmount": 500000,
    "endDate": "2026-12-31T23:59:59Z",
    "accountabilityVideo": "https://res.cloudinary.com/...",
    "memberEmails": ["friend@example.com"],
    "memberPhones": ["+2348098765432"]
  }
  ```

- `GET /piggy-banks` - List all user's piggy banks
- `GET /piggy-banks/:id` - Get piggy bank details
- `POST /piggy-banks/:id/members` - Add member (owner only)
  ```json
  {
    "memberIdentifier": "user@example.com"
  }
  ```
- `DELETE /piggy-banks/:id/members/:userId` - Remove member (owner only)

### Contributions

- `POST /contributions` - Create contribution (initiates payment)
  ```json
  {
    "piggyBankId": "uuid",
    "amount": 50000,
    "videoUrl": "https://res.cloudinary.com/..."
  }
  ```

- `GET /contributions/piggy-bank/:piggyBankId` - List all contributions
- `GET /contributions/timeline/:piggyBankId` - Get memory timeline
- `POST /contributions/webhook` - Paystack webhook (public endpoint)

## Database Schema

The database uses the following main tables:

- **User**: User accounts with phone/email authentication
- **PiggyBank**: Savings goals with time-locks
- **PiggyBankMember**: Many-to-many relationship for members
- **Contribution**: Deposits with video URLs
- **WithdrawalRequest**: Withdrawal requests with approval tracking
- **WithdrawalApproval**: Individual member approvals
- **OTP**: OTP codes for verification

See `prisma/schema.prisma` for the complete schema.

## Development

### Database Management

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio to view/edit data
npx prisma studio
```

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

1. Set up a PostgreSQL database (AWS RDS, Railway, etc.)
2. Set environment variables in your hosting platform
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
4. Build and start the application:
   ```bash
   npm run build
   npm run start:prod
   ```

## TODO / Future Enhancements

- [ ] Implement Redis caching and BullMQ job queues
- [ ] Add SMS OTP sending (Termii/Twilio integration)
- [ ] Implement Firebase Cloud Messaging for push notifications
- [ ] Complete Paystack payment integration
- [ ] Add Cloudinary video upload helper endpoints
- [ ] Implement withdrawal processing logic
- [ ] Add interest-bearing savings calculations
- [ ] Implement streaks and gamification
- [ ] Add comprehensive API documentation (Swagger)
- [ ] Set up automated testing
- [ ] Add rate limiting and security headers
- [ ] Implement audit logging

## License

MIT

## Support

For issues or questions, please contact the development team.
