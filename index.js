const extractionUtil = require('./lib/extraction-util');
const fileHandlerUtil = require('./lib/file-handler-util');
const googleBucketUtil = require('./lib/google-bucket-util');
const textReplacementUtil = require('./lib/text-replacement-util');
const fs =  require('fs');
// Processes Archive to put js, css and other assets in public folder
// returns html file with updated resources location
exports.processArchive = function(archivePath, outputPath, tempPath, storage, bucket, callback) {
    extractionUtil.extract(archivePath, tempPath, function(targetFolder) {
        var files = {};
        var filesList = [];
        filesList = walkSync([targetFolder], filesList);
        var randomFolderName = -1;
        var baseURL = "https://storage.googleapis.com/" + bucket + "/" + outputPath;
        filesList.forEach(function(file) {
            var fileName = file.substr(file.lastIndexOf("/")+1);
            var folderName = file.substr(0, file.lastIndexOf("/"));
            if (fileName.substr(fileName.lastIndexOf(".")+1) == "html") {
                // don't move to s3
                // there is going to be only one html file
                files["html"] = fs.readFileSync(folderName + "/" + fileName, "utf-8");
            }else {
                randomFolderName = googleBucketUtil.uploadFile(folderName, fileName, storage, bucket, outputPath, randomFolderName);
                var fileExtension = fileName.substr(fileName.lastIndexOf(".")+1);
                if (!(fileExtension in files)) {
                    files[fileExtension] = [];
                }
                
                files[fileExtension].push(baseURL + "/" + randomFolderName + "/" + fileName);
            }
            
        });
        fileHandlerUtil.removeDir(targetFolder);
        callback(files);
    });
}

exports.updatePageLinks = function(pageString, files) {
    pageString = textReplacementUtil.updateJSReference(pageString, files['js']);
    pageString = textReplacementUtil.updateCSSReference(pageString, files['css']);
    imgArr = getImageArr(files);
    pageString = textReplacementUtil.updateAssetsReference(pageString, imgArr);
    return pageString;
}

exports.updateOfferURL = function(pageString, offerURL, linkClass) {
    return textReplacementUtil.updateOfferURL(pageString, offerURL, linkClass);
}

function getImageArr(files) {
    var retArr = [];
    if (files['png'] != undefined) {
        retArr = retArr.concat(files['png']);
    }
    if (files['jpg'] != undefined) {
        retArr = retArr.concat(files['jpg']);
    }
    if (files['jpeg'] != undefined) {
        retArr = retArr.concat(files['jpeg']);
    }
    if (files['bmp'] != undefined) {
        retArr = retArr.concat(files['bmp']);
    }
    return retArr;
}

function walkSync(dirList, filesList) {
    if (dirList.length > 0) {
        var dir = dirList[0];
        var files = fs.readdirSync(dirList[0]);
        dirList.splice(0, 1);
        files.forEach(function(file) {
            if (fs.lstatSync(dir + "/" + file).isDirectory()) {
                dirList.push(dir + "/" + file);
            }else {
                filesList.push(dir + "/" + file);
            }
        });
        filesList.concat(walkSync(dirList, filesList));
    }
    return filesList;
}