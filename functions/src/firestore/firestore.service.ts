import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase);

@Injectable()
export class FirestoreService {
    db: FirebaseFirestore.Firestore;
    constructor() {        
        this.db = admin.firestore();
    }
    profiles() {
        return this.db.collection('profiles');
    }
    challenges() {
        return this.db.collection('challenges');
    }
}
