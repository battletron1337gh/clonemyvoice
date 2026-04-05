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
exports.IntegrationsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const integrations_service_1 = require("./integrations.service");
const dto_1 = require("./dto");
let IntegrationsController = class IntegrationsController {
    constructor(integrationsService) {
        this.integrationsService = integrationsService;
    }
    async listIntegrations(req) {
        return this.integrationsService.listIntegrations(req.user.userId);
    }
    async connectPlatform(req, platform) {
        return this.integrationsService.connectPlatform(req.user.userId, platform);
    }
    async disconnectPlatform(req, platform) {
        return this.integrationsService.disconnectPlatform(req.user.userId, platform);
    }
    async updateSettings(req, platform, dto) {
        return this.integrationsService.updateSettings(req.user.userId, platform, dto);
    }
};
exports.IntegrationsController = IntegrationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "listIntegrations", null);
__decorate([
    (0, common_1.Post)(':platform/connect'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "connectPlatform", null);
__decorate([
    (0, common_1.Post)(':platform/disconnect'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "disconnectPlatform", null);
__decorate([
    (0, common_1.Patch)(':platform/settings'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('platform')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateIntegrationSettingsDto]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "updateSettings", null);
exports.IntegrationsController = IntegrationsController = __decorate([
    (0, common_1.Controller)('integrations'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [integrations_service_1.IntegrationsService])
], IntegrationsController);
//# sourceMappingURL=integrations.controller.js.map