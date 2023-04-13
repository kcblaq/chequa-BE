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
exports.NotifyService = void 0;
const common_1 = require("@nestjs/common");
const prismacon_service_1 = require("../prismacon/prismacon.service");
let NotifyService = class NotifyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getEmail(dto) {
        const newemail = this.prisma.notify.create({
            data: {
                email: dto.email,
            }
        });
        return newemail;
    }
    async pendingNotifications() {
        const allemail = await this.prisma.notify.findMany();
        return allemail;
    }
};
NotifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prismacon_service_1.PrismaconService])
], NotifyService);
exports.NotifyService = NotifyService;
//# sourceMappingURL=notify.service.js.map