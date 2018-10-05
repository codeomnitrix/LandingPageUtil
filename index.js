const extractionUtil = require('./lib/extraction-util');
const fileHandlerUtil = require('./lib/file-handler-util');
const textReplacementUtil = require('./lib/text-replacement-util');
const fs =  require('fs');
// Processes Archive to put js, css and other assets in public folder
// returns html file with updated resources location
exports.processArchive = function(archivePath, outputPath, tempPath) {
    extractionUtil.extract(archivePath, tempPath, function(targetFolder) {
        var files = {};
        var filesList = walkSync([targetFolder], []);
        var randomFolderName = -1;
        filesList.forEach(function(file) {
            randomFolderName = fileHandlerUtil.moveFileViaExtension(targetFolder, file, outputPath, randomFolderName);
            var fileExtension = file.subStr(file.lastIndexOf(".")+1);
            if (!(fileExtension in files)) {
                files[fileExtension] = [];
            }
            files[fileExtension].push(outputPath + "/" + randomFolderName + "/" + file);
        });
        fileHandlerUtil.removeDir(targetFolder);
        return files;
    });
}

exports.updatePageLinks = function(pageString, files) {
    pageString = textReplacementUtil.updateJSReference(pageString, files['js']);
    pageString = textReplacementUtil.updateCSSReference(pageString, files['css']);
    pageString = textReplacementUtil.updateAssetsReference(pageString, files['png']
                                                        .concat(files['jpg'])
                                                        .concat(files['jpeg'])
                                                        .concat(files['bmp']));
    return pageString;
}

exports.updateOfferURL = function(pageString, offerURL, linkClass) {
    return textReplacementUtil.updateOfferURL(pageString, offerURL, linkClass);
}

function walkSync(dirList, filesList) {
    if (dirList.length > 0) {
        var files = fs.readdirSync(dirList[0]);
        dirList.splice(0, 1);
        files.forEach(function(file) {
            if (fs.fstatSync(dir + file).isDirectory()) {
                dirList.push(dir + file);
            }else {
                filesList.push(file);
            }
        });
        walkSync(dirList);
    }else {
        return filesList;
    }
    
}