

export interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  nickName?: string;
  age?: number;
  gender?: 'male' | 'female';
  totalSteps?: number;
  dateSolved?: Date;
}
export interface ProfileStates {
  currentProfile: Profile;
  profiles: Profile[];
}
function state(): ProfileStates {
  return {
    profiles: [],
    currentProfile: {}
  }
};

export default state;
