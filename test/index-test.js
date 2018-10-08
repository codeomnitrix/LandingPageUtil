const expect = require('chai').expect;
const fs = require('fs');
const rimraf = require('rimraf');

var landingPageUtil = require("../index");

describe("Landing Page Util test", function() {
    var filesObj = [];
    it("should be able to process archive", function(done) {
        landingPageUtil.processArchive("/Users/vinitt/Documents/AffTracker/LandingPageService/public/uploads/test.zip", 
        __dirname + "/temp", __dirname + "/temp", function(files) {
            expect(files['js'] != null)
            expect(files['css'] != null)
            expect(files['html'] != null);
            filesObj.push(files);
            done();
        });
    });

    it("should update the resources url in html file", function(done) {
        landingPageUtil.processArchive("/Users/vinitt/Documents/AffTracker/LandingPageService/public/uploads/test.zip", 
        __dirname + "/temp", __dirname + "/temp", function(files) {
            var htmlContent = fs.readFileSync(files['html'][0]);
            htmlContent = landingPageUtil.updatePageLinks(htmlContent, files);
            filesObj.push(files);
            console.log(htmlContent);
            done();
        });
    });

    after(function(done) {
        if (filesObj != null) {
            filesObj.forEach(function(oneFileObj) {
                rimraf(oneFileObj['html'][0].substr(0, oneFileObj['html'][0].lastIndexOf("/")), function(err) {
                    throw err;
                });
            });
            
        }
        done();
    })
});