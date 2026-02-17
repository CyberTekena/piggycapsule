import { PrismaService } from '../prisma/prisma.service';
import { CreatePiggyBankDto } from './dto/create-piggy-bank.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class PiggyBanksService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(userId: string, createPiggyBankDto: CreatePiggyBankDto): Promise<{
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
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
    addMember(piggyBankId: string, memberIdentifier: string, userId: string): Promise<{
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
    removeMember(piggyBankId: string, memberUserId: string, userId: string): Promise<{
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
