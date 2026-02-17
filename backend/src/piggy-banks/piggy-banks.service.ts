import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePiggyBankDto } from './dto/create-piggy-bank.dto';
import { MemberRole } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PiggyBanksService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(userId: string, createPiggyBankDto: CreatePiggyBankDto) {
    const {
      name,
      goalAmount,
      endDate,
      accountabilityVideo,
      memberEmails,
      memberPhones,
    } = createPiggyBankDto;

    // Validate end date is in the future
    const endDateObj = new Date(endDate);
    if (endDateObj <= new Date()) {
      throw new BadRequestException('End date must be in the future');
    }

    // Create piggy bank with creator as owner
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
            role: MemberRole.OWNER,
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

    // Add invited members
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
              role: MemberRole.MEMBER,
            },
          });
          await this.notificationsService.sendNotification(
            user.phone,
            user.email,
            `You have been invited to join the piggy bank "${name}"!`,
          );
        }
      }
    }

    return this.findOne(piggyBank.id, userId);
  }

  async findAll(userId: string) {
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

  async findOne(id: string, userId: string) {
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
      throw new NotFoundException('Piggy bank not found');
    }

    // Check if user is a member
    const isMember = piggyBank.members.some(
      (member) => member.userId === userId,
    );
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this piggy bank');
    }

    return piggyBank;
  }

  async addMember(
    piggyBankId: string,
    memberIdentifier: string,
    userId: string,
  ) {
    const piggyBank = await this.findOne(piggyBankId, userId);

    // Check if user is owner
    const isOwner = piggyBank.members.some(
      (member) => member.userId === userId && member.role === MemberRole.OWNER,
    );
    if (!isOwner) {
      throw new ForbiddenException('Only the owner can add members');
    }

    // Find user to add
    const userToAdd = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: memberIdentifier }, { phone: memberIdentifier }],
      },
    });

    if (!userToAdd) {
      throw new NotFoundException('User not found');
    }

    // Check if already a member
    const existingMember = await this.prisma.piggyBankMember.findUnique({
      where: {
        piggyBankId_userId: {
          piggyBankId,
          userId: userToAdd.id,
        },
      },
    });

    if (existingMember) {
      throw new BadRequestException('User is already a member');
    }

    await this.prisma.piggyBankMember.create({
      data: {
        piggyBankId,
        userId: userToAdd.id,
        role: MemberRole.MEMBER,
      },
    });

    await this.notificationsService.sendNotification(
      userToAdd.phone,
      userToAdd.email,
      `You have been added to the piggy bank "${piggyBank.name}"!`,
    );

    return this.findOne(piggyBankId, userId);
  }

  async removeMember(
    piggyBankId: string,
    memberUserId: string,
    userId: string,
  ) {
    const piggyBank = await this.findOne(piggyBankId, userId);

    // Check if user is owner
    const isOwner = piggyBank.members.some(
      (member) => member.userId === userId && member.role === MemberRole.OWNER,
    );
    if (!isOwner) {
      throw new ForbiddenException('Only the owner can remove members');
    }

    // Cannot remove owner
    const memberToRemove = piggyBank.members.find(
      (member) => member.userId === memberUserId,
    );
    if (memberToRemove?.role === MemberRole.OWNER) {
      throw new BadRequestException('Cannot remove the owner');
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
}
