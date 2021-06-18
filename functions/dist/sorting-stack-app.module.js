"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortingStackAppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const game_controller_1 = require("./game/game.controller");
const stack_controller_1 = require("./game/stack/stack.controller");
const game_service_1 = require("./game/game.service");
const stack_service_1 = require("./game/stack/stack.service");
const player_service_1 = require("./game/player/player.service");
const player_controller_1 = require("./game/player/player.controller");
const profile_controller_1 = require("./profile/profile.controller");
const profile_service_1 = require("./profile/profile.service");
const firestore_service_1 = require("./firestore/firestore.service");
let SortingStackAppModule = class SortingStackAppModule {
};
SortingStackAppModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [app_controller_1.AppController, game_controller_1.GameController, stack_controller_1.StackController, player_controller_1.PlayerController, profile_controller_1.ProfileController],
        providers: [app_service_1.AppService, game_service_1.GameService, stack_service_1.StackService, player_service_1.PlayerService, profile_service_1.ProfileService, firestore_service_1.FirestoreService],
    })
], SortingStackAppModule);
exports.SortingStackAppModule = SortingStackAppModule;
//# sourceMappingURL=sorting-stack-app.module.js.map