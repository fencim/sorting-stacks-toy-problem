import { ProfileDto } from '../dto/profile.dto';
import { RegisterProfileDto } from '../dto/register-profile.dto';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    create(newProfile: RegisterProfileDto): Promise<ProfileDto>;
    findOne(id: string): Promise<ProfileDto>;
    deleteOne(id: string): Promise<ProfileDto>;
    update(id: string, player: ProfileDto): Promise<ProfileDto>;
}
