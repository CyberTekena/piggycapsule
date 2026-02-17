import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PiggyBanksService } from './piggy-banks.service';
import { CreatePiggyBankDto } from './dto/create-piggy-bank.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('piggy-banks')
@UseGuards(JwtAuthGuard)
export class PiggyBanksController {
    constructor(private readonly piggyBanksService: PiggyBanksService) { }

    @Post()
    create(@Req() req: any, @Body() createPiggyBankDto: CreatePiggyBankDto) {
        return this.piggyBanksService.create(req.user.id, createPiggyBankDto);
    }

    @Get()
    findAll(@Req() req: any) {
        return this.piggyBanksService.findAll(req.user.id);
    }

    @Get(':id')
    findOne(@Req() req: any, @Param('id') id: string) {
        return this.piggyBanksService.findOne(id, req.user.id);
    }

    @Post(':id/members')
    addMember(
        @Req() req: any,
        @Param('id') id: string,
        @Body('memberIdentifier') memberIdentifier: string,
    ) {
        return this.piggyBanksService.addMember(id, memberIdentifier, req.user.id);
    }

    @Delete(':id/members/:userId')
    removeMember(
        @Req() req: any,
        @Param('id') id: string,
        @Param('userId') userId: string,
    ) {
        return this.piggyBanksService.removeMember(id, userId, req.user.id);
    }
}
