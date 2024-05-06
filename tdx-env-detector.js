// ==UserScript==
// @name         TDX MSU Environment Detector
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/norto2mr/MSU-TDX-Tampermonkey
// @version      1.2
// @description  Detects MSU's TDX environment and overlays a warning
// @author       Matt Norton
// @match        https://msuitdev.teamdynamix.com/SBTDAdmin/*
// @match        https://tdx.msu.edu/SBTDAdmin/*
// @match        https://tdx.msu.edu/TDAdmin/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teamdynamix.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const dev = 'https://msuitdev.teamdynamix.com/SBTDAdmin';
    const test = 'https://tdx.msu.edu/SBTDAdmin';
    const prod = 'https://tdx.msu.edu/TDAdmin';
    var color = 'black';
    var env = 'UNKNOWN';

    if (document.URL.includes(dev)) {
        color = 'green';
        env = 'DEVELOPMENT';
    }
    else if (document.URL.includes(test)) {
        color = 'orange';
        env = 'SANDBOX';
    }
    else if (document.URL.includes(prod)) {
        color = 'red';
        env = 'PRODUCTION';
    }

    function removeBanner () {
        document.getElementById("tdxwarning").remove();
    }

    var banner = document.createElement("div");
    banner.id = "tdxwarning"
    banner.innerHTML = `<marquee scrollamount='50' behavior='alternate'>${env} ENVIRONMENT</marquee>`;
    banner.style = `position:fixed;z-index:99999;bottom:0;right:0;width:100%;height:10vh;font-size:6vh;opacity:.5;color:white;background-color:${color};`;
    document.body.firstChild.before(banner);
    banner.addEventListener ("click", removeBanner, false);
})();
