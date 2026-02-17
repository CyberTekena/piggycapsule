import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private notificationsService;
    constructor(prisma: PrismaService, jwtService: JwtService, notificationsService: NotificationsService);
    signup(signupDto: SignupDto): Promise<{
        message: string;
        userId: string;
        otpCode: string | undefined;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        user: {
            id: string;
            phone: string | null;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            phone: string | null;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    refreshToken(userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private generateTokens;
    private generateOTP;
}
