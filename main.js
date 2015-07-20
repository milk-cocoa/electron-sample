'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWin = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
    app.quit();
});

// Electronの初期化を待つ
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWin = new BrowserWindow({width: 800, height: 600});
  mainWin.loadUrl('file://' + __dirname + '/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWin.on('closed', function() {
    mainWin = null;
  });
});