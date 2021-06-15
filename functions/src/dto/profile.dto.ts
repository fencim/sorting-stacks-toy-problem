import { ApiProperty } from "@nestjs/swagger";
import { IProfile } from "../interfaces/profile.interface";

export class ProfileDto implements IProfile {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    nickName: string;
    @ApiProperty()
    age: number;
    @ApiProperty()
    gender: 'male' | 'female';
}