import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { PrismaconService } from './../prismacon/prismacon.service';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private config;
    private jwt;
    constructor(prisma: PrismaconService, config: ConfigService, jwt: JwtService);
    signUp(dto: AuthDto): Promise<Token>;
    login(): void;
    logout(): void;
    refresh(): void;
    updateRtHash(id: string, rt: string): Promise<void>;
    hashy(data: string): Promise<string>;
    tokenGenerator(id: string, email: string): Promise<{
        refresh_token: string;
        access_token: string;
    }>;
}
