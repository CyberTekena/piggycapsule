import { Module } from '@nestjs/common';
import { PiggyBanksService } from './piggy-banks.service';
import { PiggyBanksController } from './piggy-banks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [PiggyBanksController],
  providers: [PiggyBanksService],
})
export class PiggyBanksModule {}
