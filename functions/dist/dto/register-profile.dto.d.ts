import { IProfile } from "../interfaces/profile.interface";
export declare class RegisterProfileDto implements IProfile {
    id?: string;
    firstName: string;
    lastName: string;
    nickName: string;
    age: number;
    gender: 'male' | 'female';
}
