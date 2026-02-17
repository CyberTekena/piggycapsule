# PiggyCapsule

**A shared digital savings platform with memories, accountability, and time-locked goals.**

PiggyCapsule enables couples, families, or partners to collaboratively save money over a fixed period while creating a video time capsule of memories and intentions.

---

## 📦 Project Structure

```
piggycapsule/
├── backend/          # NestJS API server
├── mobile/           # React Native (Expo) mobile app
└── README.md         # This file
```

---

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma migrate dev
npm run start:dev
```

See [backend/README.md](backend/README.md) for detailed instructions.

### Mobile App Setup

```bash
cd mobile
npm install
npm start
```

See mobile/README.md for detailed instructions (coming soon).

---

## 🎯 Core Features

### MVP (v1.0)

- ✅ User authentication (phone/email + OTP)
- ✅ Create time-locked piggy banks with accountability videos
- ✅ Add deposits with memory videos
- ✅ Group member management
- ✅ Paystack payment integration
- ✅ Time-locked withdrawals with unanimous approval
- ✅ Memory timeline playback

### Future Enhancements

- Interest-bearing savings
- AI memory recaps
- Savings streaks and gamification
- Family vaults
- Social sharing

---

## 🛠️ Tech Stack

**Backend:**

- NestJS + PostgreSQL + Prisma
- Paystack (payments)
- Cloudinary (video storage)
- Firebase Cloud Messaging (notifications)

**Mobile:**

- React Native (Expo)
- React Query (data fetching)
- React Navigation
- Expo Camera & AV

---

## 📝 License

MIT

---

## 🤝 Contributing

## 🛠️ Mock Data Reference (Development)

During development, the following mock values are used to simulate external services.

### Authentication (OTP)

- **OTP Code**: `123456` (Fixed for all phone numbers/emails in dev mode)
- **Test Phone**: `+2348000000000`
- **Test Email**: `test@piggycapsule.com`

### Payments (Paystack)

- **Test Card**: Use Paystack's standard test cards.
- **Mock Payment Link**: `https://checkout.paystack.com/mock-payment-page`
- **Mock Ref Prefix**: `MOCK_REF_`

### Video Upload (Cloudinary)

- **Mock Video URL**: `https://res.cloudinary.com/demo/video/upload/v1/dog.mp4`
- **Mock Signature**: `mock_signature_123`
