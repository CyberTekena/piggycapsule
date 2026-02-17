import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginDto {
    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    password: string;
}
