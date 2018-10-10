var bucketUploader = {};

bucketUploader.uploadFile = function(sourceFolder, file, storage, bucket, targetFolder, randomFolder=-1) {
    if (randomFolder == -1) {
        randomFolder = Math.floor(Math.random()*1e14);
    }
    storage.bucket(bucket).upload(sourceFolder + "/" + file, {
        destination: targetFolder + "/" + randomFolder + "/" + file,
        public: true
    });
    return randomFolder;
}

module.exports = bucketUploader;