"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoicesModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const voices_controller_1 = require("./voices.controller");
const voices_service_1 = require("./voices.service");
const elevenlabs_service_1 = require("./elevenlabs.service");
const prisma_module_1 = require("../prisma/prisma.module");
let VoicesModule = class VoicesModule {
};
exports.VoicesModule = VoicesModule;
exports.VoicesModule = VoicesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, axios_1.HttpModule],
        controllers: [voices_controller_1.VoicesController],
        providers: [voices_service_1.VoicesService, elevenlabs_service_1.ElevenLabsService],
        exports: [voices_service_1.VoicesService, elevenlabs_service_1.ElevenLabsService],
    })
], VoicesModule);
//# sourceMappingURL=voices.module.js.map