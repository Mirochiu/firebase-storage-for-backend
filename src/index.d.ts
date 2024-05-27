declare module "@mirochiu/firebase-storage-for-backend" {
    export function createClient(storageBucket: string, serviceAccountKey: Object | string): {
        firebaseBucket: import("@google-cloud/storage").Bucket;
        bucketName: string;
        hasFile(storagePath: string): Promise<boolean>;
        getFile(storagePath: string): Promise<import("@google-cloud/storage").File>;
        getText(storagePath: string): Promise<string>;
        getJson(storagePath: string): Promise<Object>;
        getFileUrlasync(storagePath: string): Promise<string>;
        upload(storagePath: string, content: string): Promise<import("@google-cloud/storage").File>;
    };
}
