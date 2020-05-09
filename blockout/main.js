// グローバルに展開
phina.globalize();


var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 480;

var BAR_WIDTH = 100;
var BAR_HEIGHT = 5;
var SPEED = 10;

var CIRCLE_RADIUS = 16;
var dx = SPEED;
var dy = SPEED; 
var GRAVITY = 0.98;

var fadeflg = false;

phina.define('Circle', {
  superClass: 'CircleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: 'red',  // 塗りつぶし色
      stroke: null, // ストローク色
      radius: CIRCLE_RADIUS, // 半径
    });
    this.superInit(options);

    this.blendMode = 'lighter';
    // 下への移動値
    this.vx = dx;
    this.vy = dy;
  },

  update: function() {

      this.x += this.vx;
      this.y += this.vy;
      
      if (this.bottom > SCREEN_HEIGHT) {
        this.bottom = SCREEN_HEIGHT;
        this.vy *= -1;
      }else if(this.top < 0){
        this.top = 0;
        this.vy *= -1;
      }
      if (this.right > SCREEN_WIDTH) {
        this.right = SCREEN_WIDTH;
        this.vx *= -1;
      }else if(this.left < 0){
        this.left = 0;
        this.vx *= -1;
      }
    
  },
});



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

    this.addCircle(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

    var c = Circle({
      x:100,
      y:100,
    }).addChildTo(this);

    // ラベル
    Label({
      text: 'BLOCKOUT',
      fontSize: 72,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    var label2 = Label({
      text: 'Touch to Start',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), SCREEN_HEIGHT * 3 / 4);

    label2.update = function(app) {
      // cos波で透明度を変化させてみる
      label2.alpha = (Math.cos(app.frame*8*Math.PI/180)+1)*0.5;
    };

  },

    // サークルを追加
    addCircle: function(x, y) {
      var color = "hsla({0}, 75%, 50%, 0.75)".format(Math.randint(0, 360));
      // サークルを生成
      var circle = Circle({
        fill: color,
        x: x,
        y: y,
      }).addChildTo(this);
    },

  // タッチで次のシーンへ
  onpointstart: function() {
    this.exit();
  },
});

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
    //this.exit();  
  },
      // タッチ保持イベント
  onpointstay: function(e) {
        // スプライトをタッチ位置に
              
        //circleshape.x = e.pointer.x;
        //sprite.y = e.pointer.y;
      },
      // タッチ移動イベント
    onpointmove:function(e) {
        // スプライトをタッチ位置に
        //circleshape.x = e.pointer.x;
        //sprite.y = e.pointer.y;
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
        nextLabel: 'GameScene',
      },
      {
        className: 'GameScene',
        label: 'GameScene',
        nextLabel: 'TitleScene',
      },
    ]
  });
  //app.enableStats();
  // 実行
  app.run();
});
