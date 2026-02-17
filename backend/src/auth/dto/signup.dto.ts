import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class SignupDto {
    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;
}
