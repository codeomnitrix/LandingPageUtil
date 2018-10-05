const fs = require("fs");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const textReplacementUtil = {};

textReplacementUtil.updateJSReference = function(codeString, jsFiles, codeType="html") {
    if(codeType == "html") {
        var domObj = new JSDOM(codeString);
        jsFiles.forEach(function(jsFile) {
            replaceElementProperty(domObj, "script[src$=" + jsFile.subStr(jsFile.lastIndexOf("/") + 1) + "]", "src", jsFile);
        });
        return domObj.window.document.documentElement.outerHTML;
    }
}

textReplacementUtil.updateCSSReference = function(codeString, cssFiles, codeType="html") {
    if(codeType == "html") {
        var domObj = new JSDOM(codeString);
        cssFiles.forEach(function(cssFile) {
            replaceElementProperty(domObj, "link[href$=" + cssFile.subStr(cssFile.lastIndexOf("/") + 1) + "]", "src", cssFile);
        });
        return domObj.window.document.documentElement.outerHTML;
    }
}

// for now only go for images, lets figure out for other type of assets later point of time
textReplacementUtil.updateAssetsReference = function(codeString, assetFiles, codeType="html") {
    if (codeType == "html") {
        var domObj = new JSDOM(codeString);
        assetFiles.forEach(function(assetFile) {
            replaceElementProperty(domObj, "[src$=" + assetFile.subStr(assetFile.lastIndexOf("/") + 1) + "]", "src", assetFile);
        });
    }
}

textReplacementUtil.updateOfferURL = function(codeString, offerURL, linkClass) {
    var dom = new JSDOM(codeString)
    var allLinks = dom.window.document.querySelectorAll('.' + linkClass);
    allLinks.forEach(function(link) {
        link.setAttribute("href", offerURL);
    });
    return dom.window.document.documentElement.outerHTML;
}

function replaceElementProperty(domObj, elementSelector, attributeName, newVal) {
    domObj.window.document.querySelectorAll(elementSelector).forEach(function(elt) {
        elt.setAttribute(attributeName, newVal);
    });
}

module.exports = textReplacementUtil;