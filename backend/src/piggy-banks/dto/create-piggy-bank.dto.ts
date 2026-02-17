import { IsString, IsNumber, IsDateString, IsArray, IsOptional, Min } from 'class-validator';

export class CreatePiggyBankDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    goalAmount: number;

    @IsDateString()
    endDate: string;

    @IsString()
    accountabilityVideo: string; // Cloudinary URL

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    memberEmails?: string[]; // Emails of members to invite

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    memberPhones?: string[]; // Phone numbers of members to invite
}
