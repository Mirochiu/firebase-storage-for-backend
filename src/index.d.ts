declare module "@mirochiu/firebase-storage-for-backend" {
    import type { File, Bucket } from '@google-cloud/storage';
    export function createClient(storageBucket: string, serviceAccountKey: Object | string): {
        firebaseBucket: Bucket;
        bucketName: string;
        hasFile(storagePath: string): Promise<boolean>;
        getFile(storagePath: string): Promise<File>;
        getText(storagePath: string): Promise<string>;
        getJson(storagePath: string): Promise<Object>;
        getFileUrl(pathOrFile: string | File): Promise<string>;
        upload(storagePath: string, content: string): Promise<File>;
    };
    export default createClient;
}
