import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { ContributionStatus } from '@prisma/client';

@Injectable()
export class ContributionsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createContributionDto: CreateContributionDto) {
        const { piggyBankId, amount, videoUrl } = createContributionDto;

        // Check if user is a member of the piggy bank
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
            throw new ForbiddenException('You are not a member of this piggy bank');
        }

        // Check if piggy bank is still active
        if (member.piggyBank.status !== 'ACTIVE') {
            throw new BadRequestException('This piggy bank is not active');
        }

        // Generate payment reference (this will be used with Paystack)
        const paymentReference = `PGC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create pending contribution
        const contribution = await this.prisma.contribution.create({
            data: {
                piggyBankId,
                userId,
                amount,
                videoUrl,
                paymentReference,
                status: ContributionStatus.PENDING,
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

        // TODO: Initialize Paystack transaction and return payment URL
        const paystackPaymentUrl = `https://checkout.paystack.com/${paymentReference}`;

        return {
            contribution,
            paymentUrl: paystackPaymentUrl,
            paymentReference,
        };
    }

    async findAll(piggyBankId: string, userId: string) {
        // Check if user is a member
        const member = await this.prisma.piggyBankMember.findUnique({
            where: {
                piggyBankId_userId: {
                    piggyBankId,
                    userId,
                },
            },
        });

        if (!member) {
            throw new ForbiddenException('You are not a member of this piggy bank');
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

    async verifyPayment(paymentReference: string) {
        const contribution = await this.prisma.contribution.findUnique({
            where: {
                paymentReference,
            },
            include: {
                piggyBank: true,
            },
        });

        if (!contribution) {
            throw new NotFoundException('Contribution not found');
        }

        // TODO: Verify payment with Paystack API
        // For now, we'll mark it as completed
        const updatedContribution = await this.prisma.contribution.update({
            where: {
                id: contribution.id,
            },
            data: {
                status: ContributionStatus.COMPLETED,
            },
        });

        // Update piggy bank current amount
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

        // TODO: Send notification to all members

        return updatedContribution;
    }

    async getMemoryTimeline(piggyBankId: string, userId: string) {
        // Check if user is a member
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
            throw new ForbiddenException('You are not a member of this piggy bank');
        }

        // Get all completed contributions with videos
        const contributions = await this.prisma.contribution.findMany({
            where: {
                piggyBankId,
                status: ContributionStatus.COMPLETED,
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
                createdAt: 'asc', // Chronological order
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
}
