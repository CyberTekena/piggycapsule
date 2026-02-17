import { PrismaService } from '../prisma/prisma.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
export declare class ContributionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createContributionDto: CreateContributionDto): Promise<{
        contribution: {
            user: {
                phone: string | null;
                email: string | null;
                firstName: string | null;
                lastName: string | null;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ContributionStatus;
            userId: string;
            piggyBankId: string;
            amount: number;
            videoUrl: string;
            paymentReference: string;
        };
        paymentUrl: string;
        paymentReference: string;
    }>;
    findAll(piggyBankId: string, userId: string): Promise<({
        user: {
            phone: string | null;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ContributionStatus;
        userId: string;
        piggyBankId: string;
        amount: number;
        videoUrl: string;
        paymentReference: string;
    })[]>;
    verifyPayment(paymentReference: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ContributionStatus;
        userId: string;
        piggyBankId: string;
        amount: number;
        videoUrl: string;
        paymentReference: string;
    }>;
    getMemoryTimeline(piggyBankId: string, userId: string): Promise<{
        piggyBank: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            goalAmount: number;
            endDate: Date;
            accountabilityVideo: string;
            currentAmount: number;
            startDate: Date;
            status: import("@prisma/client").$Enums.PiggyBankStatus;
            createdById: string;
        };
        videos: {
            id: string;
            videoUrl: string;
            amount: number;
            contributor: {
                phone: string | null;
                email: string | null;
                firstName: string | null;
                lastName: string | null;
                id: string;
            };
            createdAt: Date;
        }[];
    }>;
}
