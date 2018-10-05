const expect = require('chai').expect;
const fs = require('fs');
const rimraf = require('rimraf');

var extractionUtil = require('../lib/extraction-util');
var fileHandlerUtil = require('../lib/file-handler-util');

describe("file-handler-util for file movement", function() {
    var dirName = "";
    var randomFolderName = -1;
    before(function(done) {
        extractionUtil.extract(__dirname + "/temp/Archive.zip", __dirname + "/temp", function(dir) {
            dirName = dir;
            done();
        })
    })

    it("js file should be moved to js folder", function() {
        randomFolderName = fileHandlerUtil.moveFileViaExtension(dirName, "bootstrap.min.js", __dirname + "/temp", randomFolderName);    
        expect(fs.readdirSync(__dirname + "/temp/" + randomFolderName + "/js")[0] == "bootstrap.min.js");
    });

    it("css file should be moved to css folder", function() {
        randomFolderName = fileHandlerUtil.moveFileViaExtension(dirName, "style.css", __dirname + "/temp", randomFolderName);    
        expect(fs.readdirSync(__dirname + "/temp/" + randomFolderName + "/css")[0] == "style.css");
    });

    it("html file should be moved base folder", function() {
        randomFolderName = fileHandlerUtil.moveFileViaExtension(dirName, "index.html", __dirname + "/temp", randomFolderName);    
        expect(fs.readdirSync(__dirname + "/temp/" + randomFolderName)[0] == "index.html");
    });

    after(function(done) {
        if (dirName != "") {
            rimraf(dirName, function(err){});
        }
        if (randomFolderName != -1) {
            rimraf(__dirname + "/temp/" + randomFolderName, function(err){});
        }
        done();
    })
})