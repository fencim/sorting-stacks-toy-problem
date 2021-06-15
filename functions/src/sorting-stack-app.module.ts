import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameController } from './game/game.controller';
import { StackController } from './game/stack/stack.controller';
import { GameService } from './game/game.service';
import { StackService } from './game/stack/stack.service';
import { PlayerService } from './game/player/player.service';
import { PlayerController } from './game/player/player.controller';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { FirestoreService } from './firestore/firestore.service';

@Module({
  imports: [],
  controllers: [AppController, GameController, StackController, PlayerController, ProfileController],
  providers: [AppService, GameService, StackService, PlayerService, ProfileService, FirestoreService],
})
export class SortingStackAppModule {}
