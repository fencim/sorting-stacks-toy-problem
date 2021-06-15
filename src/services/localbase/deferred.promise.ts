/**
 * Helper for promise management
 */
export class DeferredPromise<T> {
    promise: Promise<T>;
    resolve: (value: T | Promise<T>) => void;
    reject: (e: any) => void;
    constructor() {
        this.resolve = (v?:T| Promise<T>) => {};
        this.reject = (e:any) => {};
        this.promise = (new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        }));
    }
}   