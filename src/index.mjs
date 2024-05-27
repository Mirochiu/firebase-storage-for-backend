import admin from 'firebase-admin';
import { getStorage, getDownloadURL } from 'firebase-admin/storage';

export const createClient = (storageBucket, serviceAccountKey) => {
    const getBucket = () => {
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccountKey),
                storageBucket: storageBucket,
            });
        }

        return getStorage().bucket();
    }

    const bucket = getBucket();

    const hasFile = async (storagePath) => {
        const file = bucket.file(storagePath);
        const [exists] = await file.exists();
        return exists;
    };

    const getFile = async (storagePath) => {
        const file = bucket.file(storagePath);
        const [exists] = await file.exists();
        if (exists) return file;
        return null;
    };

    const getText = async (storagePath) => {
        const contents = await bucket.file(storagePath).download();
        return contents.toString();
    };

    const getJson = async (storagePath) => {
        const content = await getText(storagePath);
        return JSON.parse(content);
    };

    const getFileUrl = async (storagePath) => {
        const file = await getFile(storagePath);
        if (file) return await getDownloadURL(file);
        return '';
    };

    const upload = async (storagePath, content) => {
        const file = bucket.file(storagePath);
        await file.save(content);
        return file;
    };

    return {
        firebaseBucket: bucket,
        bucketName: storageBucket,
        hasFile,
        getFile,
        getText,
        getJson,
        getFileUrl,
        upload,
    };
}

export default createClient;
