const fs = require("fs");
const rimraf = require("rimraf");

const fileHandlerUtil = {};

fileHandlerUtil.moveFile = function(sourceLocation, fileName, targetLocation, callback) {
    var fileExtension = fileName.substr(fileName.lastIndexOf(".")).substr(1);
    var randomStr = Math.floor(Math.random()*100000);
    var newFileName = fileName.substr(0, fileName.lastIndexOf(".")) + "_" + randomStr + "." + fileExtension;
    fs.rename(sourceLocation + "/" + fileName, targetLocation + "/" + newFileName, function(err) {
        if (err) {
            throw new Error("Error moving the file " + err);
        }
        callback(newFileName);
    });
}

fileHandlerUtil.moveFileViaExtension = function(sourceLocation, fileName, targetLocation, callback) {
    var fileExtension = fileName.substr(fileName.lastIndexOf(".")).substr(1);

    createDirectories(targetLocation);
    if (validExtension(fileExtension)) {
        switch(fileExtension) {
            case "js": 
                this.moveFile(sourceLocation, fileName, targetLocation + "/js", callback)
                break;
            case "css": 
                this.moveFile(sourceLocation, fileName, targetLocation + "/css", callback);
                break;
            case "html": 
                this.moveFile(sourceLocation, fileName, targetLocation, callback);
                break;
            default: 
                this.moveFile(sourceLocation, fileName, targetLocation + "/assets", callback);
                break;
        }
    }
    // else just skip the movement
}

fileHandlerUtil.removeDir = function(directory) {
    rimraf(directory, function(err) {
        if (err) {
            throw new Error("Error while deleting the directory " + err);
        }
        callback();
    });
}

function createDirectories(targetLocation) {
    if (!fs.existsSync(targetLocation + "/js")) {
        fs.mkdirSync(targetLocation + "/js");
    }
    if (!fs.existsSync(targetLocation + "/css")) {
        fs.mkdirSync(targetLocation + "/css");
    }
    if (!fs.existsSync(targetLocation + "/assets")) {
        fs.mkdirSync(targetLocation + "/assets");
    }
}

function validExtension(extension) {
    const allowedExtension = ["css", "js", "jpeg", "jpg", "png", "ttf", "otf", "html"];
    if (allowedExtension.indexOf(extension) > -1) {
        return true;
    }else {
        return false;
    }
}

module.exports = fileHandlerUtil;