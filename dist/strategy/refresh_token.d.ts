import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
declare const RefreshToken_base: new (...args: any[]) => Strategy;
export declare class RefreshToken extends RefreshToken_base {
    constructor(config: ConfigService);
    validate(req: Request, payload: any): any;
}
export {};
