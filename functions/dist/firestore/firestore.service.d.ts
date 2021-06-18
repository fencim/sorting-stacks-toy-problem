export declare class FirestoreService {
    db: FirebaseFirestore.Firestore;
    constructor();
    profiles(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
    challenges(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
}
