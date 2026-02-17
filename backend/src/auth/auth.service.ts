import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import * as bcrypt from 'bcrypt';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private notificationsService: NotificationsService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { phone, email, password, firstName, lastName } = signupDto;

    // Validate that at least phone or email is provided
    if (!phone && !email) {
      throw new BadRequestException('Either phone or email must be provided');
    }

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [phone ? { phone } : {}, email ? { email } : {}].filter(
          (condition) => Object.keys(condition).length > 0,
        ),
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this phone or email already exists',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        phone,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    // Generate OTP
    const otpCode = this.generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5); // 5 minutes expiry

    await this.prisma.oTP.create({
      data: {
        phone: phone || null,
        email: email || null,
        code: otpCode,
        expiresAt,
      },
    });

    // Send OTP via NotificationsService
    await this.notificationsService.sendOtp(
      phone || null,
      email || null,
      otpCode,
    );

    return {
      message: 'User registered successfully. OTP sent to your phone/email.',
      userId: user.id,
      // For development only - remove in production
      otpCode: process.env.NODE_ENV === 'development' ? otpCode : undefined,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phone, email, code } = verifyOtpDto;

    if (!phone && !email) {
      throw new BadRequestException('Either phone or email must be provided');
    }

    const otpRecord = await this.prisma.oTP.findFirst({
      where: {
        OR: [phone ? { phone } : {}, email ? { email } : {}].filter(
          (condition) => Object.keys(condition).length > 0,
        ),
        code,
        verified: false,
        expiresAt: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Mark OTP as verified
    await this.prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    // Get user
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [phone ? { phone } : {}, email ? { email } : {}].filter(
          (condition) => Object.keys(condition).length > 0,
        ),
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate JWT tokens
    const tokens = await this.generateTokens(user.id);

    return {
      message: 'OTP verified successfully',
      ...tokens,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { phone, email, password } = loginDto;

    if (!phone && !email) {
      throw new BadRequestException('Either phone or email must be provided');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [phone ? { phone } : {}, email ? { email } : {}].filter(
          (condition) => Object.keys(condition).length > 0,
        ),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT tokens
    const tokens = await this.generateTokens(user.id);

    return {
      message: 'Login successful',
      ...tokens,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async refreshToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user.id);
  }

  private async generateTokens(userId: string) {
    const payload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
