'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

// mainWindowはグローバルにしとかないとGCで勝手に閉じてしまう
var mainWindow = null;

// ウインドウが全部閉じたら実行
app.on('window-all-closed', function() {
  // Macとかでは、Cmd + Q が押されない限りアプリは終了させない
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メインウインドウ
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // メインウィンドウが閉じられたら実行
  mainWindow.on('closed', function() {
    // 参照外し
    mainWindow = null;
  });
});