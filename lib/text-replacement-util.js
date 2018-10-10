const fs = require("fs");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const textReplacementUtil = {};

textReplacementUtil.updateJSReference = function(codeString, jsFiles, codeType="html") {
    if(codeType == "html") {
        var domObj = new JSDOM(codeString);
        if (jsFiles != undefined) {
            jsFiles.forEach(function(jsFile) {
                replaceElementProperty(domObj, "script[src$='" + jsFile.substr(jsFile.lastIndexOf("/") + 1) + "']", "src", getServerPath(jsFile));
            });
        }
        return domObj.window.document.documentElement.outerHTML;
    }
}

textReplacementUtil.updateCSSReference = function(codeString, cssFiles, codeType="html") {
    if(codeType == "html") {
        var domObj = new JSDOM(codeString);
        if (cssFiles != undefined) {
            cssFiles.forEach(function(cssFile) {
                replaceElementProperty(domObj, "link[href$='" + cssFile.substr(cssFile.lastIndexOf("/") + 1) + "']", "href", getServerPath(cssFile));
            });
        }
        return domObj.window.document.documentElement.outerHTML;
    }
}

// for now only go for images, lets figure out for other type of assets later point of time
textReplacementUtil.updateAssetsReference = function(codeString, assetFiles, codeType="html") {
    if (codeType == "html") {
        var domObj = new JSDOM(codeString);
        if (assetFiles != undefined) {
            assetFiles.forEach(function(assetFile) {
                replaceElementProperty(domObj, "[src$='" + assetFile.substr(assetFile.lastIndexOf("/") + 1) + "']", "src", getServerPath(assetFile));
            });
        }
        return codeString;
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

function getServerPath(jsFile) {
    // return "/" + jsFile.substr(jsFile.indexOf("public"));
    return jsFile;
}

module.exports = textReplacementUtil;