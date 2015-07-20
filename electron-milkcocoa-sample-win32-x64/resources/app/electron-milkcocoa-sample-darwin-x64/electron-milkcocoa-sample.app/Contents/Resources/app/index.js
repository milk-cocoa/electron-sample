'use strict';

var remote = require('remote');
var MilkCocoa = remote.require('milkcocoa');
var $ = require('./jquery.min.js');


//1.ミルクココアインスタンスを作成
var milkcocoa = new MilkCocoa("flagi9edsvtg.mlkcca.com");

//2."message"データストアを作成
var ds = milkcocoa.dataStore("message");

$(function() {
	//3."message"データストアからメッセージを取ってくる
	ds.stream().size(30).sort("desc").next(function(err, data) {
	    if(err) alert(err);
	    data.forEach(function(d) {
	        renderMessage(d.value);
	    });
	});

	//4."message"データストアのプッシュイベントを監視
	ds.on("push", function(e) {
	    renderMessage(e.value);
	});

	var last_message = "dummy";

	function renderMessage(message) {
	    var message_html = '<p class="post-text">' + escapeHTML(message.content) + '</p>';
	    var date_html = '';
	    if(message.date) {
	        date_html = '<p class="post-date">'+escapeHTML( new Date(message.date).toLocaleString())+'</p>';
	    }
	    $("#"+last_message).before('<div id="'+message.id+'" class="post">'+message_html + date_html +'</div>');
	    last_message = message.id;
	}

	function post() {
	    //5."message"データストアにメッセージをプッシュする
	    var content = escapeHTML($("#content").val());
	    if (content && content !== "") {
	        ds.push({
	            content: content,
	            date: new Date().getTime()
	        });
	    }
	    $("#content").val("");
	}

	$('#post').click(function () {
	    post();
	})
	$('#content').keydown(function (e) {
	    if (e.which == 13){
	        post();
	        return false;
	    }
	});
});

//インジェクション対策
function escapeHTML(val) {
    return $('<div>').text(val).html();
};