import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
export declare class ContributionsController {
    private readonly contributionsService;
    constructor(contributionsService: ContributionsService);
    create(req: any, createContributionDto: CreateContributionDto): Promise<{
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
    findAll(req: any, piggyBankId: string): Promise<({
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
    getMemoryTimeline(req: any, piggyBankId: string): Promise<{
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
    webhook(body: any): Promise<{
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
}
