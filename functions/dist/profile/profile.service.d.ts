import { ProfileDto } from '../dto/profile.dto';
import { RegisterProfileDto } from '../dto/register-profile.dto';
import { FirestoreService } from '../firestore/firestore.service';
export declare class ProfileService {
    private firestore;
    constructor(firestore: FirestoreService);
    create(profile: RegisterProfileDto): Promise<ProfileDto>;
    findOne(id: string): Promise<ProfileDto>;
    deleteOne(id: string): Promise<ProfileDto>;
    update(id: string, profile: ProfileDto): Promise<ProfileDto>;
}
