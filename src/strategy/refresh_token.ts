import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class RefreshToken extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor( config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			passReqToCallback: true,
			secretOrKey: config.get('R_TOKEN_SECRET'),
		});
	}
    validate(req: Request, payload: any) {
        const r_token = req?.get('authorization')?.replace('Bearer', '').trim();
        return {
            ...payload,
            r_token
        }
	}
}
