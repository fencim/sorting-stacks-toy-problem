import { StackDto } from '../../dto/stack.dto';
import { StackService } from './stack.service';
export declare class StackController {
    private readonly stackService;
    constructor(stackService: StackService);
    findAll(gameid: string): Promise<StackDto[]>;
}
