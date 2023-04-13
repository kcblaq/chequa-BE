"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyModule = void 0;
const common_1 = require("@nestjs/common");
const notify_controller_1 = require("./notify.controller");
const notify_service_1 = require("./notify.service");
const dto_1 = require("./dto");
let NotifyModule = class NotifyModule {
};
NotifyModule = __decorate([
    (0, common_1.Module)({
        controllers: [notify_controller_1.NotifyController],
        providers: [notify_service_1.NotifyService, dto_1.Dtonotify]
    })
], NotifyModule);
exports.NotifyModule = NotifyModule;
//# sourceMappingURL=notify.module.js.map