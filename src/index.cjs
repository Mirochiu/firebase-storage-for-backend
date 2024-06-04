const admin = require('firebase-admin');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

const createClient = (storageBucket, serviceAccountKey) => {
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

    const $f = (p, opt) => typeof p === 'string'
        ? bucket.file(p, opt) : p;

    const hasFile = async (pathOrFile) => {
        const file = $f(pathOrFile);
        const [exists] = await file.exists();
        return exists;
    };

    const getFile = async (pathOrFile) => {
        const file = $f(pathOrFile);
        const [exists] = await file.exists();
        if (exists) return file;
        return null;
    };

    const getText = async (pathOrFile, def) => {
        const file = await getFile(pathOrFile);
        if (!file) return def;
        const [contents] = await file.download();
        return contents.toString();
    };

    const getJson = async (pathOrFile) => {
        const content = await getText(pathOrFile);
        if (!content) return null;
        return JSON.parse(content);
    };

    const getFileUrl = async (pathOrFile) => {
        const file = await getFile(pathOrFile);
        if (!file) return '';
        return await getDownloadURL(file);
    };

    const upload = async (pathOrFile, content) => {
        const file = $f(pathOrFile);
        await file.save(content);
        return file;
    };

    const getMetadata = async (pathOrFile) => {
        const file = await getFile(pathOrFile);
        const [metadata] = await file.getMetadata();
        return metadata;
    };

    const setMetadata = async (pathOrFile, objOrMetadata) => {
        const file = await getFile(pathOrFile)
        const [metadata] = await file.setMetadata(objOrMetadata);
        return metadata;
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
        getMetadata,
        setMetadata,
    };
}

module.exports = createClient;