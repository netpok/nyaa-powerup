// ==UserScript==
// @name         Nyaa PowerUP
// @namespace    https://github.com/netpok/nyaa-powerup
// @version      0.1
// @description  Add qBittorrent links, RSS prompt & remove ads
// @author       netpok
// @match        http://www.nyaa.se/*
// @match        https://www.nyaa.se/*
// @require      http://code.jquery.com/jquery-3.1.1.min.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

$("#tabnav").find("li:nth(6)").find("a").click(function (e) {
    e.preventDefault();
    prompt("RSS URL:", this.href);
});
