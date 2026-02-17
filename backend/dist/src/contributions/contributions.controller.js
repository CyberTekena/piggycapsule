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
exports.ContributionsController = void 0;
const common_1 = require("@nestjs/common");
const contributions_service_1 = require("./contributions.service");
const create_contribution_dto_1 = require("./dto/create-contribution.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ContributionsController = class ContributionsController {
    contributionsService;
    constructor(contributionsService) {
        this.contributionsService = contributionsService;
    }
    create(req, createContributionDto) {
        return this.contributionsService.create(req.user.id, createContributionDto);
    }
    findAll(req, piggyBankId) {
        return this.contributionsService.findAll(piggyBankId, req.user.id);
    }
    getMemoryTimeline(req, piggyBankId) {
        return this.contributionsService.getMemoryTimeline(piggyBankId, req.user.id);
    }
    async webhook(body) {
        const { reference } = body.data;
        return this.contributionsService.verifyPayment(reference);
    }
};
exports.ContributionsController = ContributionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_contribution_dto_1.CreateContributionDto]),
    __metadata("design:returntype", void 0)
], ContributionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('piggy-bank/:piggyBankId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('piggyBankId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ContributionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('timeline/:piggyBankId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('piggyBankId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ContributionsController.prototype, "getMemoryTimeline", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContributionsController.prototype, "webhook", null);
exports.ContributionsController = ContributionsController = __decorate([
    (0, common_1.Controller)('contributions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [contributions_service_1.ContributionsService])
], ContributionsController);
//# sourceMappingURL=contributions.controller.js.map