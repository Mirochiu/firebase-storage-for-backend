declare module "@mirochiu/firebase-storage-for-backend" {
    import type { File, Bucket, FileMetadata } from '@google-cloud/storage';
    export function createClient(storageBucket: string, serviceAccountKey: Object | string): {
        firebaseBucket: Bucket;
        bucketName: string;
        hasFile(pathOrFile: string | File): Promise<boolean>;
        getFile(pathOrFile: string | File): Promise<File | null>;
        getText(pathOrFile: string | File, def?: string): Promise<string | undefined>;
        getJson(pathOrFile: string | File): Promise<Object | null>;
        getFileUrl(pathOrFile: string | File): Promise<string>;
        upload(pathOrFile: string, content: string): Promise<File>;
        getMetadata(pathOrFile: string | File): Promise<FileMetadata>;
        setMetadata(pathOrFile: string | File, objOrMetadata: object | FileMetadata): Promise<FileMetadata>;
        listAllFiles(): Promise<File[]>;
        listFilesWithPrefix(prefix: string): Promise<File[]>;
        uploadFromLocalFile(localPath: string, remotePath: string): Promise<File>;
        uploadLocalDirectory(localDirectory: string, remoteDirectory?: string): Promise<File[]>;
    };
    export default createClient;
}
