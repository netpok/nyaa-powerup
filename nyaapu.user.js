// ==UserScript==
// @name         Nyaa PowerUP
// @namespace    https://github.com/netpok/nyaa-powerup
// @version      0.1
// @description  Add qBittorrent links, RSS prompt & remove ads
// @author       netpok
// @match        http://www.nyaa.se/*
// @match        https://www.nyaa.se/*
// @require      http://code.jquery.com/jquery-3.1.1.min.js
// @grant        GM_addStyle
// ==/UserScript==
/* jshint -W097 */
'use strict';

$("#tabnav").find("li:nth(6)").find("a").click(function (e) {
    e.preventDefault();
    prompt("RSS URL:", this.href);
});

$("#main").find("div[class!='content']").remove();

GM_addStyle(".qbHead{width: 20px;} .qbDownload{filter: hue-rotate(75deg);}");
$(".tlistththree").before('<th class="qbHead">qB</th>');
$(".tlistdownload").before('<td class="qbDownload"><a href="#"><img src="//files.nyaa.se/www-7.png" alt="Add to qBittorrent"></a></td>');