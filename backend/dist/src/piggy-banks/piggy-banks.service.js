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
exports.PiggyBanksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
let PiggyBanksService = class PiggyBanksService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(userId, createPiggyBankDto) {
        const { name, goalAmount, endDate, accountabilityVideo, memberEmails, memberPhones, } = createPiggyBankDto;
        const endDateObj = new Date(endDate);
        if (endDateObj <= new Date()) {
            throw new common_1.BadRequestException('End date must be in the future');
        }
        const piggyBank = await this.prisma.piggyBank.create({
            data: {
                name,
                goalAmount,
                endDate: endDateObj,
                accountabilityVideo,
                createdById: userId,
                members: {
                    create: {
                        userId,
                        role: client_1.MemberRole.OWNER,
                    },
                },
            },
            include: {
                members: {
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
                },
            },
        });
        if (memberEmails || memberPhones) {
            const memberIdentifiers = [
                ...(memberEmails || []).map((email) => ({ email })),
                ...(memberPhones || []).map((phone) => ({ phone })),
            ];
            for (const identifier of memberIdentifiers) {
                const user = await this.prisma.user.findFirst({
                    where: identifier,
                });
                if (user && user.id !== userId) {
                    await this.prisma.piggyBankMember.create({
                        data: {
                            piggyBankId: piggyBank.id,
                            userId: user.id,
                            role: client_1.MemberRole.MEMBER,
                        },
                    });
                    await this.notificationsService.sendNotification(user.phone, user.email, `You have been invited to join the piggy bank "${name}"!`);
                }
            }
        }
        return this.findOne(piggyBank.id, userId);
    }
    async findAll(userId) {
        const members = await this.prisma.piggyBankMember.findMany({
            where: {
                userId,
            },
            include: {
                piggyBank: {
                    include: {
                        members: {
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
                        },
                        _count: {
                            select: {
                                contributions: true,
                            },
                        },
                    },
                },
            },
        });
        return members.map((member) => member.piggyBank);
    }
    async findOne(id, userId) {
        const piggyBank = await this.prisma.piggyBank.findUnique({
            where: { id },
            include: {
                members: {
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
                },
                contributions: {
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
                },
            },
        });
        if (!piggyBank) {
            throw new common_1.NotFoundException('Piggy bank not found');
        }
        const isMember = piggyBank.members.some((member) => member.userId === userId);
        if (!isMember) {
            throw new common_1.ForbiddenException('You are not a member of this piggy bank');
        }
        return piggyBank;
    }
    async addMember(piggyBankId, memberIdentifier, userId) {
        const piggyBank = await this.findOne(piggyBankId, userId);
        const isOwner = piggyBank.members.some((member) => member.userId === userId && member.role === client_1.MemberRole.OWNER);
        if (!isOwner) {
            throw new common_1.ForbiddenException('Only the owner can add members');
        }
        const userToAdd = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: memberIdentifier }, { phone: memberIdentifier }],
            },
        });
        if (!userToAdd) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingMember = await this.prisma.piggyBankMember.findUnique({
            where: {
                piggyBankId_userId: {
                    piggyBankId,
                    userId: userToAdd.id,
                },
            },
        });
        if (existingMember) {
            throw new common_1.BadRequestException('User is already a member');
        }
        await this.prisma.piggyBankMember.create({
            data: {
                piggyBankId,
                userId: userToAdd.id,
                role: client_1.MemberRole.MEMBER,
            },
        });
        await this.notificationsService.sendNotification(userToAdd.phone, userToAdd.email, `You have been added to the piggy bank "${piggyBank.name}"!`);
        return this.findOne(piggyBankId, userId);
    }
    async removeMember(piggyBankId, memberUserId, userId) {
        const piggyBank = await this.findOne(piggyBankId, userId);
        const isOwner = piggyBank.members.some((member) => member.userId === userId && member.role === client_1.MemberRole.OWNER);
        if (!isOwner) {
            throw new common_1.ForbiddenException('Only the owner can remove members');
        }
        const memberToRemove = piggyBank.members.find((member) => member.userId === memberUserId);
        if (memberToRemove?.role === client_1.MemberRole.OWNER) {
            throw new common_1.BadRequestException('Cannot remove the owner');
        }
        await this.prisma.piggyBankMember.delete({
            where: {
                piggyBankId_userId: {
                    piggyBankId,
                    userId: memberUserId,
                },
            },
        });
        return this.findOne(piggyBankId, userId);
    }
};
exports.PiggyBanksService = PiggyBanksService;
exports.PiggyBanksService = PiggyBanksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], PiggyBanksService);
//# sourceMappingURL=piggy-banks.service.js.map