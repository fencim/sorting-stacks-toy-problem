import * as _ from 'lodash';
import { DeferredPromise } from './deferred.promise';
import { update } from 'lodash';
export interface ITableInfo {
    tableName: string;
    primaryKey: string;
}
export let IndexDb:IDBFactory;
if (typeof window !== 'undefined') {
    IndexDb = window.indexedDB;
} 
export class StateDBController {
    private db?: IDBDatabase;
    private openPromise: Promise<any> = Promise.resolve();
    constructor(public dbName: string, public tableSchema: ITableInfo[]) {
        this.initDB();
    }
    initDB(): Promise<any> {
        var req: IDBOpenDBRequest;
        var self = this;
        this.openPromise = this.openPromise
            .then(() => {
                var deferred = new DeferredPromise<any>();
                if (typeof IndexDb === 'undefined' || !IndexDb.open) return Promise.resolve();
                req = IndexDb.open(self.dbName);
                req.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
                    self.db = (ev.target as any)['result'];
                    self.initSchema(ev);                    
                };
                req.onsuccess = (e: any) => {
                    self.db = e.target.result;                    
                    deferred.resolve(self.db)
                }
                req.onerror = (e: Event) => {
                    deferred.reject(e);
                }
                return deferred.promise;
            });
        return this.openPromise;
    }
    initSchema(e: IDBVersionChangeEvent) {
        var db: IDBDatabase = (e.currentTarget as any)['result'];
        var storeArg: IDBObjectStoreParameters;
        var tInfo: ITableInfo;      
        for (var it in this.tableSchema) {
            tInfo = this.tableSchema[it];
            storeArg = { keyPath: tInfo.primaryKey, autoIncrement: true };
            var tblLocal: IDBObjectStore;            
            tblLocal = db.createObjectStore(tInfo.tableName, storeArg);
            tblLocal.createIndex(tInfo.primaryKey, 'keyPath');
        }
    }
    async reset(): Promise<any> {
        var self = this;
        var db: IDBDatabase = await this.openPromise;
        db.close();
        IndexDb.deleteDatabase(self.dbName);
        return self.initDB();
    }

    async transact<T>(tableInfo: ITableInfo): Promise<StateTableController<T>> {
        var db: IDBDatabase = await this.openPromise;
        return new StateTableController(tableInfo, db);
    }
}

export class StateTableController<T>{
    constructor(private tableInfo: ITableInfo, private db: IDBDatabase) { }
    CreateRow(data: T): Promise<T> {
        var trans: IDBTransaction;
        var objStore: IDBObjectStore;
        var addRequest: IDBRequest;
        var deferred = new DeferredPromise<T>();
        trans = this.db.transaction([this.tableInfo.tableName], "readwrite");
        objStore = trans.objectStore(this.tableInfo.tableName);
        addRequest = objStore.add(data);
        addRequest.onsuccess = (ev: Event) => {
            deferred.resolve((ev.target as any)['result']);
        }
        return deferred.promise;
    }
    ReadAll(query?:string):Promise<T[]> {
        var trans: IDBTransaction;
        var objStore: IDBObjectStore;
        var getRequest: IDBRequest;
        var deferred = new DeferredPromise<T[]>();
        trans = this.db.transaction([this.tableInfo.tableName], "readonly");
        objStore = trans.objectStore(this.tableInfo.tableName);
        getRequest = objStore["getAll"](query);
        getRequest.onsuccess = (ev: Event) => {
            var result: T[] = (ev.target as any)['result'];
            deferred.resolve(result);
        }
        getRequest.onerror = (error: Event) => {
            deferred.reject(error);
        }
        return deferred.promise;  
    }
    ReadRow(key: string): Promise<T> {
        var trans: IDBTransaction;
        var objStore: IDBObjectStore;
        var getRequest: IDBRequest;
        var deferred = new DeferredPromise<T>();
        trans = this.db.transaction([this.tableInfo.tableName], "readonly");
        objStore = trans.objectStore(this.tableInfo.tableName);
        getRequest = objStore.get(key);
        getRequest.onsuccess = (ev: Event) => {
            var result: T = (ev.target as any)['result'];
            deferred.resolve(result);
        }
        getRequest.onerror = (error: Event) => {
            deferred.reject(error);
        }
        return deferred.promise;
    }
    UpdateRow(updateData: T): Promise<T> {
        var self = this;
        var trans: IDBTransaction;
        var objStore: IDBObjectStore;
        var getRequest: IDBRequest;
        var index: IDBIndex;
        var deferred = new DeferredPromise<T>();

        trans = this.db.transaction([this.tableInfo.tableName], "readwrite");
        objStore = trans.objectStore(this.tableInfo.tableName);
        index = objStore.index(this.tableInfo.primaryKey);
        
        getRequest = index.get((updateData as any)[this.tableInfo.primaryKey]);
        getRequest.onsuccess = (getEvent: Event) => {
            var data: T = (getEvent.target as any)['result'];
            var updateRequest: IDBRequest;
            data = _.assignIn(data, updateData);
            updateRequest = objStore.put(data);
            updateRequest.onsuccess = (updateEvent: Event) => {
                var result: T = (updateEvent.target as any)['result'];
                deferred.resolve(data);
            }
            updateRequest.onerror = (ev: Event) => {
                deferred.reject(ev);
            }
        }
        getRequest.onerror = (ev: Event) => {
            deferred.resolve(self.CreateRow(updateData));
        }
        return deferred.promise;
    }
    DeleteRow(key: string): Promise<T> {
        var trans: IDBTransaction;
        var objStore: IDBObjectStore;
        var getRequest: IDBRequest;
        var index: IDBIndex;
        var deferred = new DeferredPromise<T>();

        trans = this.db.transaction([this.tableInfo.tableName], "readwrite");
        objStore = trans.objectStore(this.tableInfo.tableName);
        index = objStore.index(this.tableInfo.primaryKey);
        getRequest = index.get(key);
        getRequest.onsuccess = (getEvent: Event) => {
            var data: T = (getEvent.target as any)['result'];
            var deleteRequest: IDBRequest
            deleteRequest = objStore.delete(key);
            deleteRequest.onsuccess = (updateEvent: Event) => {
                deferred.resolve(data);
            }
            deleteRequest.onerror = (ev: Event) => {
                deferred.reject(ev);
            }
        }
        getRequest.onerror = (ev: Event) => {
            deferred.reject(ev);
        }
        return deferred.promise;
    }
}