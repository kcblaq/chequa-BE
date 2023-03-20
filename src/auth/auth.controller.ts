import { AuthDto } from './dto/auth.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
    ) { }

    @Post('signup') 
    signUp(@Body() dto: AuthDto ): Promise<Token> {
        return this.authService.signUp(dto)
 }
    
    @Post('login') 
login(){ }
    
    @Post('logout')
logout() { }

    @Post('refresh')
refresh(){ }
}
