import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { StackController } from './stack.controller';
import { StackService } from './stack.service';

describe('StackController', () => {
  let controller: StackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StackController],
      providers:[GameService, StackService]
    }).compile();

    controller = module.get<StackController>(StackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
