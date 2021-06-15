export interface IProfile {
    id?: string;
    firstName : string;
    lastName: string;
    nickName: string;
    age : number;
    gender: 'male' | 'female';
}