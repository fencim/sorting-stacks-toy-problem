import { StateDBController, ITableInfo } from './state-db.controller';
interface KeyValue {
    key: string;
    value: any;
};
var appStateTable: ITableInfo = {
    tableName: 'states',
    primaryKey: 'key'
};
export class KeyValueStorage {
    private appDb: StateDBController;
    constructor(collection:string) {
        this.appDb = new StateDBController(collection, [appStateTable]);
    }
    async getItem(key: string): Promise<any> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        keyVal = await transaction.ReadRow(key);
        return Promise.resolve(keyVal && keyVal.value);
    }
    async setItem(key: string, value: any): Promise<any> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        keyVal = await transaction.UpdateRow({
            key: key,
            value: value
        });
        return keyVal && keyVal.value;
    }
    async deleteItem(key:string): Promise<any> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        keyVal = await transaction.DeleteRow(key);
        return Promise.resolve(keyVal && keyVal.value);
    }
    async values(): Promise<any[]> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        return (await transaction.ReadAll()).map(
            kv => (kv.value)
        );
    }
    async keys(): Promise<string[]> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        return (await transaction.ReadAll()).map(
            kv => (kv.key)
        );
    }
    /**Global */
    private static appDb: StateDBController = new StateDBController('globalDb', [appStateTable]);
    static async getItem(key: string): Promise<any> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        keyVal = await transaction.ReadRow(key);
        return Promise.resolve(keyVal && keyVal.value);
    }
    static async setItem(key: string, value: any): Promise<any> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        keyVal = await transaction.UpdateRow({
            key: key,
            value: value
        });
        return keyVal && keyVal.value;
    }
    static async deleteItem(key:string): Promise<any> {
        var transaction, keyVal;
        transaction = await this.appDb.transact<KeyValue>(appStateTable);
        keyVal = await transaction.DeleteRow(key);
        return Promise.resolve(keyVal && keyVal.value);
    }
}