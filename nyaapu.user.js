// ==UserScript==
// @name         Nyaa PowerUP
// @namespace    https://github.com/netpok/nyaa-powerup
// @version      0.1
// @description  Add qBittorrent links, RSS prompt & remove ads
// @author       netpok
// @match        http://www.nyaa.se/*
// @match        https://www.nyaa.se/*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
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
$(".qbDownload").click(function (e) {
    var url=$(this).next().find("a").prop('href');
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://localhost:8080/command/getSavePath",
        onload: function (response) {
            data = new FormData();
            data.append('urls', url);
            data.append('savepath', response.responseText + "/tv.shows.2ln");
            data.append('label', "Anime");
            data.append('cookie', "");
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://localhost:8080/command/download",
                data: data,
                onload: function (response, a) {
                    console.log(response, a);
                }
            });
        }
    });
});