// グローバルに展開
phina.globalize();


var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 480;

var BAR_WIDTH = 100;
var BAR_HEIGHT = 5;
var SPEED = 20;


phina.define("TitleScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit({      
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });
    // 背景色
    this.backgroundColor = 'rgb(50,50,50)';
    // ラベル
    Label({
      text: 'BLOCKOUT',
      fontSize: 48,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    this.exit();  
  },
});


phina.define("StageSelectScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit({        
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });
    // 背景色
    this.backgroundColor = 'rgb(50,50,50)';
    // ラベル
    Label({
      text: 'StageSelectScene',
      fontSize: 48,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    this.exit();  
  },
});
/*
 * シーン03
 */
phina.define("GameScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit({       
         width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });
    // 背景色
    this.backgroundColor = 'rgb(50,50,50)';
    // ラベル
    Label({
      text: 'GameScene',
      fontSize: 48,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    this.exit();  
  },
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    // TitleScene から開始
    startLabel: 'TitleScene',
    // シーンのリストを引数で渡す
    scenes: [
      {
        className: 'TitleScene',
        label: 'TitleScene',
        nextLabel: 'StageSelectScene',
      },

      {
        className: 'StageSelectScene',
        label: 'StageSelectScene',
        nextLabel: 'GameScene',
      },
      {
        className: 'GameScene',
        label: 'GameScene',
        nextLabel: 'TitleScene',
      },
    ]
  });
  // 実行
  app.run();
});