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
exports.PiggyBanksController = void 0;
const common_1 = require("@nestjs/common");
const piggy_banks_service_1 = require("./piggy-banks.service");
const create_piggy_bank_dto_1 = require("./dto/create-piggy-bank.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PiggyBanksController = class PiggyBanksController {
    piggyBanksService;
    constructor(piggyBanksService) {
        this.piggyBanksService = piggyBanksService;
    }
    create(req, createPiggyBankDto) {
        return this.piggyBanksService.create(req.user.id, createPiggyBankDto);
    }
    findAll(req) {
        return this.piggyBanksService.findAll(req.user.id);
    }
    findOne(req, id) {
        return this.piggyBanksService.findOne(id, req.user.id);
    }
    addMember(req, id, memberIdentifier) {
        return this.piggyBanksService.addMember(id, memberIdentifier, req.user.id);
    }
    removeMember(req, id, userId) {
        return this.piggyBanksService.removeMember(id, userId, req.user.id);
    }
};
exports.PiggyBanksController = PiggyBanksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_piggy_bank_dto_1.CreatePiggyBankDto]),
    __metadata("design:returntype", void 0)
], PiggyBanksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PiggyBanksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PiggyBanksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('memberIdentifier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PiggyBanksController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':id/members/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PiggyBanksController.prototype, "removeMember", null);
exports.PiggyBanksController = PiggyBanksController = __decorate([
    (0, common_1.Controller)('piggy-banks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [piggy_banks_service_1.PiggyBanksService])
], PiggyBanksController);
//# sourceMappingURL=piggy-banks.controller.js.map