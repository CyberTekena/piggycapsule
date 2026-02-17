import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refresh(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
