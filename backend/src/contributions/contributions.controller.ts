import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contributions')
@UseGuards(JwtAuthGuard)
export class ContributionsController {
    constructor(private readonly contributionsService: ContributionsService) { }

    @Post()
    create(@Req() req: any, @Body() createContributionDto: CreateContributionDto) {
        return this.contributionsService.create(req.user.id, createContributionDto);
    }

    @Get('piggy-bank/:piggyBankId')
    findAll(@Req() req: any, @Param('piggyBankId') piggyBankId: string) {
        return this.contributionsService.findAll(piggyBankId, req.user.id);
    }

    @Get('timeline/:piggyBankId')
    getMemoryTimeline(@Req() req: any, @Param('piggyBankId') piggyBankId: string) {
        return this.contributionsService.getMemoryTimeline(piggyBankId, req.user.id);
    }

    @Post('webhook')
    async webhook(@Body() body: any) {
        // TODO: Verify Paystack signature
        const { reference } = body.data;
        return this.contributionsService.verifyPayment(reference);
    }
}
