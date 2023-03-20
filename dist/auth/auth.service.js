"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("@nestjs/config");
const prismacon_service_1 = require("./../prismacon/prismacon.service");
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, config, jwt) {
        this.prisma = prisma;
        this.config = config;
        this.jwt = jwt;
    }
    async signUp(dto) {
        const hashedpswd = await argon.hash(dto.password);
        const newuser = await this.prisma.user
            .create({
            data: {
                email: dto.email,
                password: hashedpswd,
            },
        });
        const tokens = await this.tokenGenerator(newuser.id, newuser.email);
        await this.updateRtHash(newuser.id, tokens.refresh_token);
        return tokens;
    }
    login() { }
    logout() { }
    refresh() { }
    async updateRtHash(id, rt) {
        const hashedtoken = await this.hashy(rt);
        await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                refreshToken: hashedtoken,
            }
        });
    }
    async hashy(data) {
        return this.jwt.signAsync(data);
    }
    async tokenGenerator(id, email) {
        const [refresh, access] = await Promise.all([
            this.jwt.signAsync({
                id,
                email,
            }, {
                secret: this.config.get('R_TOKEN_SECRET'),
                expiresIn: 60 * 60 * 24 * 7,
            }),
            this.jwt.signAsync({
                id,
                email,
            }, {
                secret: this.config.get('A_TOKEN_SECRET'),
                expiresIn: 60 * 20,
            }),
        ]);
        return { refresh_token: refresh, access_token: access };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prismacon_service_1.PrismaconService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map