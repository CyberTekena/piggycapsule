"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const notifications_service_1 = require("../notifications/notifications.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    notificationsService;
    constructor(prisma, jwtService, notificationsService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.notificationsService = notificationsService;
    }
    async signup(signupDto) {
        const { phone, email, password, firstName, lastName } = signupDto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('Either phone or email must be provided');
        }
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [phone ? { phone } : {}, email ? { email } : {}].filter((condition) => Object.keys(condition).length > 0),
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this phone or email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                phone,
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });
        const otpCode = this.generateOTP();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);
        await this.prisma.oTP.create({
            data: {
                phone: phone || null,
                email: email || null,
                code: otpCode,
                expiresAt,
            },
        });
        await this.notificationsService.sendOtp(phone || null, email || null, otpCode);
        return {
            message: 'User registered successfully. OTP sent to your phone/email.',
            userId: user.id,
            otpCode: process.env.NODE_ENV === 'development' ? otpCode : undefined,
        };
    }
    async verifyOtp(verifyOtpDto) {
        const { phone, email, code } = verifyOtpDto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('Either phone or email must be provided');
        }
        const otpRecord = await this.prisma.oTP.findFirst({
            where: {
                OR: [phone ? { phone } : {}, email ? { email } : {}].filter((condition) => Object.keys(condition).length > 0),
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
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        }
        await this.prisma.oTP.update({
            where: { id: otpRecord.id },
            data: { verified: true },
        });
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [phone ? { phone } : {}, email ? { email } : {}].filter((condition) => Object.keys(condition).length > 0),
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
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
    async login(loginDto) {
        const { phone, email, password } = loginDto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('Either phone or email must be provided');
        }
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [phone ? { phone } : {}, email ? { email } : {}].filter((condition) => Object.keys(condition).length > 0),
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
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
    async refreshToken(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return this.generateTokens(user.id);
    }
    async generateTokens(userId) {
        const payload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: (process.env.JWT_EXPIRES_IN || '1h'),
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d'),
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map