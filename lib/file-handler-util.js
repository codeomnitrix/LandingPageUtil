const fs = require("fs");
const rimraf = require("rimraf");

const fileHandlerUtil = {};

fileHandlerUtil.moveFile = function(sourceLocation, fileName, targetLocation) {
    fs.renameSync(sourceLocation + "/" + fileName, targetLocation + "/" + fileName, function(err) {
        if (err) {
            throw new Error("Error moving the file " + err);
        }
    });
}

// pass me a randomFolderName if already generated, else let it be -1, i will generate
fileHandlerUtil.moveFileViaExtension = function(sourceLocation, fileName, targetLocation, randomFolderName=-1) {
    var fileExtension = fileName.substr(fileName.lastIndexOf(".")).substr(1);
    randomFolderName = createDirectories(targetLocation, randomFolderName);
    if (validExtension(fileExtension)) {
        switch(fileExtension) {
            case "js": 
            this.moveFile(sourceLocation, fileName, targetLocation + "/" + randomFolderName + "/js")
                break;
            case "css": 
                this.moveFile(sourceLocation, fileName, targetLocation + "/" + randomFolderName + "/css");
                break;
            case "html": 
                this.moveFile(sourceLocation, fileName, targetLocation + "/" + randomFolderName);
                break;
            default: 
                this.moveFile(sourceLocation, fileName, targetLocation + "/" + randomFolderName + "/assets");
                break;
        }
    }
    return randomFolderName;
}

fileHandlerUtil.removeDir = function(directory) {
    rimraf(directory, function(err) {
        if (err) {
            throw new Error("Error while deleting the directory " + err);
        }
    });
}

function createDirectories(targetLocation, randomStr) {
    if (randomStr == -1) {
        randomStr = Math.floor(Math.random()*1e14);
        while (fs.existsSync(targetLocation + "/" + randomStr + "/js")) {
            randomStr = Math.floor(Math.random()*1e14);
        }
        fs.mkdirSync(targetLocation + "/" + randomStr);
        fs.mkdirSync(targetLocation + "/" + randomStr + "/js");
        fs.mkdirSync(targetLocation + "/" + randomStr +  "/css");
        fs.mkdirSync(targetLocation + "/" + randomStr + "/assets");
    }
    return randomStr;
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