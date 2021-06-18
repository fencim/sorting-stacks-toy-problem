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
exports.StackController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stack_dto_1 = require("../../dto/stack.dto");
const stack_service_1 = require("./stack.service");
let StackController = class StackController {
    constructor(stackService) {
        this.stackService = stackService;
    }
    async findAll(gameid) {
        return await this.stackService.findAll(gameid);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Get all stacks in specified game", operationId: "GetGameStacks" }),
    swagger_1.ApiResponse({ status: 200, isArray: true, type: stack_dto_1.StackDto }),
    common_1.Get(),
    __param(0, common_1.Param('gameid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StackController.prototype, "findAll", null);
StackController = __decorate([
    common_1.Controller('game/:gameid/stack'),
    __metadata("design:paramtypes", [stack_service_1.StackService])
], StackController);
exports.StackController = StackController;
//# sourceMappingURL=stack.controller.js.map