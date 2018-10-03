const fs = require("fs");

const fileHandlerUtil = {};

fileHandlerUtil.moveFile = function(sourceLocation, fileName, targetLocation) {
    fs.rename(sourceLocation + fileName, targetLocation + fileName, function(err) {
        throw new Error("Error moving the file " + err);
    });
}

fileHandlerUtil.moveFileViaExtension = function(sourceLocation, fileName, targetLocation) {
    var fileExtension = fileName.substr(fileName.lastIndexOf("."));
    if (validExtension(fileExtension)) {
        switch(fileExtension) {
            case "js": 
                this.moveFile(sourceLocation, fileName, targetLocation + "/js")
                break;
            case "css": 
                this.moveFile(sourceLocation, fileName, targetLocation + "/css");
                break;
            default: 
                this.moveFile(sourceLocation, fileName, targetLocation + "/assets");
                break;
        }
    }
    // else just skip the movement
}

fileHandlerUtil.removeDir = function(directory) {
    fs.unlink(directory, function(err) {
        throw new Error("Error while deleting the directory " + err);
    });
}

function validExtension(extension) {
    const allowedExtension = ["css", "js", "jpeg", "jpg", "png", "ttf", "otf"];
    if (allowedExtension.indexOf(extension) > -1) {
        return true;
    }else {
        return false;
    }
}

module.exports = fileHandlerUtil;