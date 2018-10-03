const extractor = require("extract-zip");
const fs = require("fs");

const extractionUtil = {}

extractionUtil.extract = function(zipLocation, targetFolder) {
    // does extraction of the zip to target location
    if (validateZip(zipLocation) && validateOrCreateTarget(targetFolder)) {
        var targetTempFolder = targetFolder + "/" +  Math.floor(Math.random()*1000000);
        extractor(zipLocation, {dir: targetTempFolder}, function(err) {
            if (err) {
                throw new Error("ExtractionUtil: Unable to extract the zip " + err);
            }
        });
    }else {
        throw new Error("ExtractionUtil: Either File not exists of target folder unaccessible");
    }
}

// validate the zip location and throw an error if there is an issue
function validateZip(zipLocation) {
    if (fs.existsSync(zipLocation)) {
        return true;
    }else {
        return false;
    }
}

// validates if the target folder is there or not, create if required
// TODO: might need to add the permissions check for the folder for extraction
function validateOrCreateTarget(targetFolder) {
    if(!fs.existsSync(targetFolder)) {
        createTarget(targetFolder);
    }
    return true;
}

function createTarget(targetFolder) {
    fs.mkdirSync(targetFolder);
}

module.exports = extractionUtil;