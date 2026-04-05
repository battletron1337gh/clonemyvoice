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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoicesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const voices_service_1 = require("./voices.service");
const dto_1 = require("./dto");
let VoicesController = class VoicesController {
    constructor(voicesService) {
        this.voicesService = voicesService;
    }
    async listVoices(req) {
        return this.voicesService.listVoices(req.user.userId);
    }
    async createVoice(req, dto) {
        return this.voicesService.createVoice(req.user.userId, dto);
    }
    async getVoice(req, id) {
        return this.voicesService.getVoice(req.user.userId, id);
    }
    async updateVoice(req, id, dto) {
        return this.voicesService.updateVoice(req.user.userId, id, dto);
    }
    async deleteVoice(req, id) {
        return this.voicesService.deleteVoice(req.user.userId, id);
    }
    async generateSpeech(req, id, dto) {
        return this.voicesService.generateSpeech(req.user.userId, id, dto);
    }
};
exports.VoicesController = VoicesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoicesController.prototype, "listVoices", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateVoiceDto]),
    __metadata("design:returntype", Promise)
], VoicesController.prototype, "createVoice", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoicesController.prototype, "getVoice", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateVoiceDto]),
    __metadata("design:returntype", Promise)
], VoicesController.prototype, "updateVoice", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoicesController.prototype, "deleteVoice", null);
__decorate([
    (0, common_1.Post)(':id/generate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.GenerateSpeechDto]),
    __metadata("design:returntype", Promise)
], VoicesController.prototype, "generateSpeech", null);
exports.VoicesController = VoicesController = __decorate([
    (0, common_1.Controller)('voices'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [voices_service_1.VoicesService])
], VoicesController);
//# sourceMappingURL=voices.controller.js.map