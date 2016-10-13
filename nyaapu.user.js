// ==UserScript==
// @name         Nyaa PowerUP
// @namespace    https://github.com/netpok/nyaa-powerup
// @version      0.1
// @description  Add qBittorrent links, RSS prompt & remove ads
// @author       netpok
// @match        http://www.nyaa.se/*
// @match        https://www.nyaa.se/*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-url-parser/2.3.1/purl.min.js
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function () {
    $("#tabnav").find("li:nth(6)").find("a").click(function (e) {
        e.preventDefault();
        prompt("RSS URL:", this.href);
    });

    $("#main").find("div[class!='content']").remove();

    var defaultLocation = $.url().param("location");
    if (!defaultLocation) {
        defaultLocation = '';
    }
    $("head").append('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">');
    $("body").append('<div id="dialog" title="Basic dialog" style="display: none;">' +
        '<form id="dlForm"><input type="hidden" id="dlUrl">' +
        'Type: <label><input type="radio" name="dlType" class="dlType" value="tv.shows.2ln" checked="checked">Anime</label>' +
        '<label><input type="radio" name="dlType" class="dlType" value="movies">Anime movie</label><br>' +
        '<label>Location: <span id="locationBase"><span id="mediaLocation"></span>/' +
        '<span id="typeLocation">tv.shows.2ln</span>/</span>' +
        '<input type="text" id="location" required="required" value="' + defaultLocation + '"></label><br>' +
        '<label>Label: <input id="label" value="Anime"></label><br>' +
        '<label>Apply for all: <input type="checkbox" id="applyForAll"></label></form></div>');
    GM_addStyle(".qbHead{width: 20px;} .qbDownload{filter: hue-rotate(75deg);}");
    $(".tlistththree").before('<th class="qbHead">qB</th>');
    $(".tlistdownload").before('<td class="qbDownload"><a href="#"><img src="//files.nyaa.se/www-7.png" alt="Add to qBittorrent"></a></td>');

    $(".qbDownload").click(function (e) {
        e.preventDefault();
        var url = $(this).next().find("a").prop('href');
        if ($("#applyForAll").prop("checked")) {
            sendToqB(url);
        } else {
            $("#dlUrl").val(url);
            $("#mediaLocation").text("/mnt/data/media");
            $("#dialog").dialog({
                buttons: {
                    "Start download": function () {
                        sendToqB($("#dlUrl").val());
                        $("#dialog").dialog("close");
                    }
                }
            });
            $("#location").focus();
        }
    });

    $(".dlType").click(function (e) {
        ($("#typeLocation").text(this.value));
    });

    function sendToqB(url) {
        data = new FormData();
        data.append('urls', url);
        data.append('savepath', $("#locationBase").text() + $("#location").val());
        data.append('label', $("#label").val());
        data.append('cookie', "");
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://localhost:8080/command/download",
            data: data,
            onload: function (response, a) {
                $.notify("Torrent sent", "success");
            }
        });
    }
})();