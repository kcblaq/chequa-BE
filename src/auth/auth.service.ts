import { RefreshToken } from './../strategy/refresh_token';
import { AccessToken } from './../strategy/access_token';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { PrismaconService } from './../prismacon/prismacon.service';
import {  Injectable } from '@nestjs/common';
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
		
		// const test = await this.prisma.user;
		// console.log('test: ' + test)
		const newuser = await this.prisma.user
			.create({
				data: {
					email: dto.email,
					password: hashedpswd,
				},
			})
		const tokens = await this.tokenGenerator(newuser.id, newuser.email)
		await this.updateRtHash(newuser.id, tokens.refresh_token)
        return tokens;
    }

	login() {}

	
	logout() {}

	refresh() { }



	async updateRtHash(id:string, rt:string) {
		const hashedtoken = await this.hashy(rt)
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
							id,
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
