import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport'

@Injectable()
export class AccessToken extends PassportStrategy(Strategy, 'jwt') {
    constructor( config: ConfigService ) {
        super({
					jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
					secretOrKey: config.get('A_TOKEN_SECRET'),
				});
    }
    validate(payload) {
        return payload
    }
}