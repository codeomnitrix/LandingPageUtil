const expect = require('chai').expect;
const fs = require('fs');
const rimraf = require('rimraf');

var landingPageUtil = require("../index");

describe("Landing Page Util test", function() {
    it("should be able to process archive", function(done) {
        landingPageUtil.processArchive("/Users/vinitt/Documents/AffTracker/LandingPageService/public/uploads/test.zip", 
        __dirname + "/temp", __dirname + "/temp", function(files) {
            expect(files['js'] != null)
            expect(files['css'] != null)
            expect(files['html'] != null);
            done();
        })
    });

    after(function(done) {
        rimraf(files['html'][0].substr(0, files['html'][0].lastIndexOf("/")), function(err) {
            throw err;
        });
        done();
    })
});