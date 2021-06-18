import { IProfile } from "../interfaces/profile.interface";
export declare class ProfileDto implements IProfile {
    id?: string;
    firstName: string;
    lastName: string;
    nickName: string;
    age: number;
    gender: 'male' | 'female';
}
