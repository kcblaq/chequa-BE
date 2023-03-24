import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Token } from './types';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(dto: AuthDto): Promise<Token>;
    login(dto: AuthDto): Promise<Token>;
    logout(req: Request): Promise<void>;
    refresh(req: Request): Promise<Token>;
}
