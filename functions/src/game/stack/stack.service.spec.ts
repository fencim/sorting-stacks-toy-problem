import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { StackService } from './stack.service';

describe('StackService', () => {
  let service: StackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StackService, GameService],
    }).compile();

    service = module.get<StackService>(StackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
