import { ApiProperty } from "@nestjs/swagger";
import { IStack } from "../interfaces/stack.interface";

export class StackDto implements IStack {
    @ApiProperty({type: "number", isArray: true})
    items: number[];

}