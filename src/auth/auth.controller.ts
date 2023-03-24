import { RefreshToken } from './../strategy/refresh_token';
import { AuthDto } from './dto/auth.dto';
import { Body, Controller, HttpCode, Post, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request} from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
    ) { }

    @Post('signup')
    signUp(@Body() dto: AuthDto): Promise<Token> {
        return this.authService.signUp(dto)
    }

    @Post('login')
    login(@Body() dto: AuthDto): Promise<Token> { 
        return this.authService.login(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) { 
        const userid = req.user;
        console.log(userid)
        return this.authService.logout(userid['id'])
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
        @HttpCode(HttpStatus.OK)
    refresh(@Req() req: Request) {
        const userdetail = req.user
        console.log(userdetail)
        return this.authService.refresh(userdetail['sub'],userdetail['r_token'])
     }
}
