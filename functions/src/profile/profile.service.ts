import { Injectable } from '@nestjs/common';
import { ProfileDto } from '../dto/profile.dto';
import { RegisterProfileDto } from '../dto/register-profile.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class ProfileService {
    constructor(private firestore: FirestoreService){}
    async create(profile: RegisterProfileDto): Promise<ProfileDto> {
        const record = await this.firestore.profiles().add(profile)
        return {
            ...profile,
            id: record.id
        }

    }
    async findOne(id: string ): Promise<ProfileDto> {
        const record = await this.firestore.profiles().doc(id).get();
        if (record.exists) {
            return record.data() as ProfileDto;
        }
        throw "Record does not exist";
    }
    async deleteOne(id: string ): Promise<ProfileDto> {        
        const doc = this.firestore.profiles().doc(id);
        
        const record = await doc.get();
        if (record.exists) {
            const data = record.data();
            await doc.delete();
            return data as ProfileDto;
        }
        throw "Record does not exist";
    }

    async update(id: string, profile: ProfileDto) : Promise<ProfileDto> {
        const doc = this.firestore.profiles().doc(id);
    
        const record = await doc.get();
        if (record.exists) {
            const data = record.data();
            await doc.set(profile);
            return data as ProfileDto;
        }
        throw "Record does not exist";
    }
}
