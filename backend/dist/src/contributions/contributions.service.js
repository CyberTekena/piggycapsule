"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ContributionsService = class ContributionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createContributionDto) {
        const { piggyBankId, amount, videoUrl } = createContributionDto;
        const member = await this.prisma.piggyBankMember.findUnique({
            where: {
                piggyBankId_userId: {
                    piggyBankId,
                    userId,
                },
            },
            include: {
                piggyBank: true,
            },
        });
        if (!member) {
            throw new common_1.ForbiddenException('You are not a member of this piggy bank');
        }
        if (member.piggyBank.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('This piggy bank is not active');
        }
        const paymentReference = `PGC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const contribution = await this.prisma.contribution.create({
            data: {
                piggyBankId,
                userId,
                amount,
                videoUrl,
                paymentReference,
                status: client_1.ContributionStatus.PENDING,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        const paystackPaymentUrl = `https://checkout.paystack.com/${paymentReference}`;
        return {
            contribution,
            paymentUrl: paystackPaymentUrl,
            paymentReference,
        };
    }
    async findAll(piggyBankId, userId) {
        const member = await this.prisma.piggyBankMember.findUnique({
            where: {
                piggyBankId_userId: {
                    piggyBankId,
                    userId,
                },
            },
        });
        if (!member) {
            throw new common_1.ForbiddenException('You are not a member of this piggy bank');
        }
        return this.prisma.contribution.findMany({
            where: {
                piggyBankId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async verifyPayment(paymentReference) {
        const contribution = await this.prisma.contribution.findUnique({
            where: {
                paymentReference,
            },
            include: {
                piggyBank: true,
            },
        });
        if (!contribution) {
            throw new common_1.NotFoundException('Contribution not found');
        }
        const updatedContribution = await this.prisma.contribution.update({
            where: {
                id: contribution.id,
            },
            data: {
                status: client_1.ContributionStatus.COMPLETED,
            },
        });
        await this.prisma.piggyBank.update({
            where: {
                id: contribution.piggyBankId,
            },
            data: {
                currentAmount: {
                    increment: contribution.amount,
                },
            },
        });
        return updatedContribution;
    }
    async getMemoryTimeline(piggyBankId, userId) {
        const member = await this.prisma.piggyBankMember.findUnique({
            where: {
                piggyBankId_userId: {
                    piggyBankId,
                    userId,
                },
            },
            include: {
                piggyBank: true,
            },
        });
        if (!member) {
            throw new common_1.ForbiddenException('You are not a member of this piggy bank');
        }
        const contributions = await this.prisma.contribution.findMany({
            where: {
                piggyBankId,
                status: client_1.ContributionStatus.COMPLETED,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return {
            piggyBank: member.piggyBank,
            videos: contributions.map(c => ({
                id: c.id,
                videoUrl: c.videoUrl,
                amount: c.amount,
                contributor: c.user,
                createdAt: c.createdAt,
            })),
        };
    }
};
exports.ContributionsService = ContributionsService;
exports.ContributionsService = ContributionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContributionsService);
//# sourceMappingURL=contributions.service.js.map