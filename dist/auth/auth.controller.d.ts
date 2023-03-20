import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Token } from './types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(dto: AuthDto): Promise<Token>;
    login(): void;
    logout(): void;
    refresh(): void;
}
