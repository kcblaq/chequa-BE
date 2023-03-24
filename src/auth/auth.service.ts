import { RefreshToken } from './../strategy/refresh_token';
import { AccessToken } from './../strategy/access_token';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { PrismaconService } from './../prismacon/prismacon.service';
import {  ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2'
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaconService,
        private config: ConfigService,
    private jwt: JwtService
	) { }

    async signUp(dto: AuthDto):Promise<Token> {
        const hashedpswd = await argon.hash(dto.password)
		const newuser = await this.prisma.user.create({
				data: {
					email: dto.email,
					password: hashedpswd,
				},
			})
		const tokens = await this.tokenGenerator(newuser.id, newuser.email)
		await this.updateRtHash(newuser.id, tokens.refresh_token)
        return tokens;
		
    }

	async login(dto: AuthDto): Promise<Token> {
		const loginuser = await this.prisma.user.findUnique({
			where :{
				email: dto.email
			}
		})
		if (!loginuser) throw new HttpException("Access denied", HttpStatus.FORBIDDEN);
		
		try {
			const matched = await argon.verify(loginuser.password, dto.password);
			if (!matched) { throw new ForbiddenException("Access denied") }
		} catch (error) { 
			throw error;
		}

		const tokens = await this.tokenGenerator(loginuser.id, loginuser.email)
		await this.updateRtHash(loginuser.id, tokens.refresh_token)
		return tokens;
	}

	
	async logout(id: string) {
		await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				refreshToken: null
			}
		})
	}

	async refresh(userid:string, rt:string): Promise<Token> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userid
			}
		}) 
		if (!user) throw new ForbiddenException("Access denied ")
		const rtmatch = await argon.verify(user.refreshToken, rt)
		if (!rtmatch) throw new ForbiddenException("Access denied, cannot generate new access token")
		const token = await this.tokenGenerator(user.id, user.email)
		await this.updateRtHash(user.id, token.refresh_token);
		return token;
	
	}



	async updateRtHash(id:string, rt:string) {
		const hashedtoken = await argon.hash(rt)
		console.log(hashedtoken)
		await this.prisma.user.update({
			where: {
				id: id
			},
			data: {
				refreshToken: hashedtoken,
			}
		})
		
	}



	async hashy(data: string): Promise<string> {
		return this.jwt.signAsync(data)
	}



   async tokenGenerator(id: string, email: string) {
        const [refresh, access] = await Promise.all([
					this.jwt.signAsync(
						{
							sub: id,
							email,
						},
						{
							secret: this.config.get('R_TOKEN_SECRET'),
							expiresIn: 60 * 60 * 24 * 7,
						}
					),
					this.jwt.signAsync(
						{
							id,
							email,
						},
						{
							secret: this.config.get('A_TOKEN_SECRET'),
							expiresIn: 60 * 20,
						}
					),
				]);
        return { refresh_token: refresh, access_token: access };
    }

}
