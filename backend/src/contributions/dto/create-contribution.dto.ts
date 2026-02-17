import { IsString, IsNumber, Min } from 'class-validator';

export class CreateContributionDto {
    @IsString()
    piggyBankId: string;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsString()
    videoUrl: string; // Cloudinary URL
}
