const extractionUtil = require('./lib/extraction-util');
const fileHandlerUtil = require('./lib/file-handler-util');
const textReplacementUtil = require('./lib/text-replacement-util');
// Processes Archive to put js, css and other assets in public folder
// returns html file with updated resources location
exports.processArchive = function(archivePath, outputPath, tempPath) {
    
    extractionUtil.extract(archivePath, tempPath);
    
}

exports.updateOfferUrl = function(pageString, linkClassName, url, identifier) {
	
}