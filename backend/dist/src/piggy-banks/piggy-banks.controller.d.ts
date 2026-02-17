import { PiggyBanksService } from './piggy-banks.service';
import { CreatePiggyBankDto } from './dto/create-piggy-bank.dto';
export declare class PiggyBanksController {
    private readonly piggyBanksService;
    constructor(piggyBanksService: PiggyBanksService);
    create(req: any, createPiggyBankDto: CreatePiggyBankDto): Promise<{
        contributions: ({
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
        })[];
        members: ({
            user: {
                phone: string | null;
                email: string | null;
                firstName: string | null;
                lastName: string | null;
                id: string;
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            joinedAt: Date;
            userId: string;
            piggyBankId: string;
        })[];
    } & {
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
    }>;
    findAll(req: any): Promise<({
        _count: {
            contributions: number;
        };
        members: ({
            user: {
                phone: string | null;
                email: string | null;
                firstName: string | null;
                lastName: string | null;
                id: string;
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            joinedAt: Date;
            userId: string;
            piggyBankId: string;
        })[];
    } & {
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
    })[]>;
    findOne(req: any, id: string): Promise<{
        contributions: ({
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
        })[];
        members: ({
            user: {
                phone: string | null;
                email: string | null;
                firstName: string | null;
                lastName: string | null;
                id: string;
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            joinedAt: Date;
            userId: string;
            piggyBankId: string;
        })[];
    } & {
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
    }>;
    addMember(req: any, id: string, memberIdentifier: string): Promise<{
        contributions: ({
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
        })[];
        members: ({
            user: {
                phone: string | null;
                email: string | null;
                firstName: string | null;
                lastName: string | null;
                id: string;
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            joinedAt: Date;
            userId: string;
            piggyBankId: string;
        })[];
    } & {
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
    }>;
    removeMember(req: any, id: string, userId: string): Promise<{
        contributions: ({
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
        })[];
        members: ({
            user: {
                phone: string | null;
                email: string | null;
                firstName: string | null;
                lastName: string | null;
                id: string;
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.MemberRole;
            joinedAt: Date;
            userId: string;
            piggyBankId: string;
        })[];
    } & {
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
    }>;
}
