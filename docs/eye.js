function getParam( name, url ){
  if( !url ) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if( !results ) return null;
  if( !results[2] ) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//基本設定
var canvas_size= 660
var max_outline_size = 500
var outline_size_bold = 1

function base(context) {
  context.translate( canvas_size/2, canvas_size/2 ) ;
  //パスの初期化
  context.beginPath() ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;

  //白目
  context.arc(
  0,  0,  // 円の中心座標
  max_outline_size / 2,           // 半径
  0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
  360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
  false                   // 方向: true=反時計回りの円、false=時計回りの円
  ) ;

  //塗りつぶし[初期化]
  context.fillStyle = "rgba(255,255,255,255)" ;
  context.fill() ;

  context.strokeStyle = "black" ; //図形の輪郭
  context.lineWidth = outline_size_bold ;
  context.stroke() ;

  context.translate( -canvas_size/2, -canvas_size/2 ) ;	//　戻す
}

//content
// L rLine
//   L  nLine
// L dLine
//サイズ連動のため

//黒目輪郭===================================================================================================
function rLine(event){
  base(context) ;

  rinkaku.beginPath() ;
  rinkaku.clearRect(0, 0, canvas_size, canvas_size) ;
  rinkaku.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  rinkaku.arc(
    0,  0,  // 円の中心座標
    r_line_size.value / 2,           // 半径
    0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
    360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
    false                   // 方向: true=反時計回りの円、false=時計回りの円
    ) ;
  rinkaku.lineWidth = r_line_bold.value ; //太さ
  rColor(Event) ;
  rinkaku.stroke() ;
  rinkaku.translate( -canvas_size/2, -canvas_size/2 ) ;	//　戻す

  //表示用
  r_line_size_msg.innerText = r_line_size.value / 100 + 'mm'
  r_line_bold_msg.innerText = r_line_bold.value / 100 + 'mm'

  nLine() ;
  dLine() ;
}

//虹彩===================================================================================================
function nLine(event){
  niji.beginPath() ;
  niji.clearRect(0, 0, canvas_size, canvas_size) ;
  niji.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして
  niji.lineWidth = n_lines_bold.value ;

  var rad_now = 0 ;
  var rad = 360 / n_lines.value ;
  var lines = n_lines.value;
  var lise_size = (r_line_size.value - r_line_bold.value ) / 2
  if (rad > 50) { rad = 50 ; }
  if (rad < 10) { rad = 10 ; }

  while ( lines > 0 || rad_now < 360 ) {
    var rad_run = Math.floor( getRandomArbitrary(3, 14) ) / 10 * rad ; //0.3倍～1.4倍
    niji.moveTo(20 * getRandomArbitrary(9, 10) / 10, 0) ;
    niji.lineTo(lise_size * getRandomArbitrary(9, 10) / 10, 0) ;
    niji.rotate( rad_run * Math.PI / 180 ) ;
    lines -= 1
    rad_now += rad_run
  }

  nColor(Event) ;
  niji.stroke() ;
  niji.translate( -canvas_size/2, -canvas_size/2 ) ; //　戻す

  //表示用
  n_lines_msg.innerText = n_lines.value
  n_lines_bold.innerText = n_lines_bold.value

  end() ;
}

//瞳孔===================================================================================================
function dLine(event){
  doukou.beginPath() ;
  doukou.clearRect(0, 0, canvas_size, canvas_size) ;
  doukou.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  doukou.arc(
    0,  0,  // 円の中心座標
    d_line_size.value / 2,           // 半径
    0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
    360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
    false                   // 方向: true=反時計回りの円、false=時計回りの円
    ) ;
  doukou.lineWidth = d_line_bold.value ; //太さ

  dColor(Event) ;
  doukou.stroke() ;
  doukou.translate( -canvas_size/2, -canvas_size/2 ) ;	//　戻す

  //表示用
  d_line_size_msg.innerText = d_line_size.value / 100 + 'mm'
  d_line_bold_msg.innerText = d_line_bold.value / 100 + 'mm'
}

function end() {
  //終端処理
}

// 色変更系 =====================================================
function rColor(Event) {
  rinkaku.strokeStyle = "hsl(" + r_colorH.value + ", " + r_colorS.value + "%, " + r_colorL.value + "%)" ;
  rinkaku.fillStyle = "hsl(" + nb_colorH.value + ", " + nb_colorS.value + "%, " + nb_colorL.value + "%)" ;
  rinkaku.fill() ;
  rinkaku.stroke() ;
}

function nColor(Event) {
  niji.strokeStyle = "hsl(" + n_colorH.value + ", " + n_colorS.value + "%, " + n_colorL.value + "%)" ;
  niji.stroke() ;
}

function nbColor(Event) {
  niji.strokeStyle = "hsl(" + nb_colorH.value + ", " + nb_colorS.value + "%, " + nb_colorL.value + "%)" ;
  niji.stroke() ;
}

function dColor(Event) {
  doukou.strokeStyle = "hsl(" + d_colorH.value + ", " + d_colorS.value + "%, " + d_colorL.value + "%)" ;
  doukou.fillStyle = "hsl(" + db_colorH.value + ", " + db_colorS.value + "%, " + db_colorL.value + "%)" ;
  doukou.fill() ;
  doukou.stroke() ;
}

// common =====================================================
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//var color = (Math.random() * 0xFFFFFF | 0).toString(16);
//var randomColor = "#" + ("000000" + color).slice(-6);
//}