import { IsString, IsEmail, IsOptional } from 'class-validator';

export class VerifyOtpDto {
    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    code: string;
}
