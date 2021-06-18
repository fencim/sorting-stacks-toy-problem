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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const profile_dto_1 = require("../dto/profile.dto");
const register_profile_dto_1 = require("../dto/register-profile.dto");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async create(newProfile) {
        return this.profileService.create(newProfile);
    }
    async findOne(id) {
        return this.profileService.findOne(id);
    }
    async deleteOne(id) {
        return this.profileService.deleteOne(id);
    }
    async update(id, player) {
        return this.profileService.update(id, player);
    }
};
__decorate([
    swagger_1.ApiBody({ type: register_profile_dto_1.RegisterProfileDto }),
    swagger_1.ApiOperation({ summary: "Register new Profile", operationId: "Register" }),
    swagger_1.ApiResponse({ status: 200, type: profile_dto_1.ProfileDto }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_profile_dto_1.RegisterProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get information of profile with id {id}", operationId: "GetProfile" }),
    swagger_1.ApiResponse({ status: 200, type: profile_dto_1.ProfileDto }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Delete profile with id {id}", operationId: "DeleteProfile" }),
    swagger_1.ApiResponse({ status: 200, type: profile_dto_1.ProfileDto }),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteOne", null);
__decorate([
    swagger_1.ApiOperation({ summary: "update profile", operationId: "UpdateProfile" }),
    swagger_1.ApiBody({ type: profile_dto_1.ProfileDto }),
    common_1.Put(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, profile_dto_1.ProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "update", null);
ProfileController = __decorate([
    common_1.Controller('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map