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
function ira() {
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
    r_line_size.value / 2 + r_line_bold.value / 2,           // 半径
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
  r_colorH_msg.innerText = r_colorH.value
  r_colorS_msg.innerText = r_colorS.value
  r_colorL_msg.innerText = r_colorL.value

  //サイズ連動
  nLine();
}

//虹彩===================================================================================================
function nLine(event){
  niji.beginPath() ;
  niji.clearRect(0, 0, canvas_size, canvas_size) ;
  niji.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして
  niji.lineWidth = n_lines_bold.value ;

  var rad_now = 0 ;
  var lines = n_lines.value ;
  var long = n_lines_long.value ;
  var lise_size = (r_line_size.value - r_line_bold.value ) / 2
  if (rad < 10) { rad = 5 ; }
  var rad_now = 360 ;
  if (lines == 0) { rad_now = -1 ; }

  while ( lines > 0 && rad_now > 0 ) {
    var rad = rad_now / lines
    var rad_run = Math.max(Math.floor( getRandomArbitrary(6, 14) ) / 10 * rad , 1) ; //0.3倍～1.4倍
    niji.moveTo(long * getRandomArbitrary(7, 10) / 10, 0) ;
    niji.lineTo(lise_size * getRandomArbitrary(9, 10) / 10, 0) ;
    niji.rotate( rad_run * Math.PI / 180 ) ;
    //判定式
    lines -= 1
    rad_now -= rad_run
  }

  nColor(Event) ;
  niji.stroke() ;
  niji.translate( -canvas_size/2, -canvas_size/2 ) ; //　戻す

  //表示用
  n_lines_msg.innerText = n_lines.value
  n_lines_bold_msg.innerText = n_lines_bold.value
  n_lines_long_msg.innerText = n_lines_long.value
  n_colorH_msg.innerText = n_colorH.value
  n_colorS_msg.innerText = n_colorS.value
  n_colorL_msg.innerText = n_colorL.value
  nb_colorH_msg.innerText = nb_colorH.value
  nb_colorS_msg.innerText = nb_colorS.value
  nb_colorL_msg.innerText = nb_colorL.value

  end() ;
}

function nBold(event) {
  niji.clearRect(0, 0, canvas_size, canvas_size) ;
  nColor(Event) ;
  niji.lineWidth = n_lines_bold.value ;
  niji.stroke() ;
}

//瞳孔===================================================================================================
function dLine(event){
  doukou.beginPath() ;
  doukou.clearRect(0, 0, canvas_size, canvas_size) ;
  doukou.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  doukou.arc(
    0,  0,  // 円の中心座標
    d_line_size.value / 2 + d_line_bold.value / 2,           // 半径
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
  d_colorH_msg.innerText = d_colorH.value
  d_colorS_msg.innerText = d_colorS.value
  d_colorL_msg.innerText = d_colorL.value
  db_colorH_msg.innerText = db_colorH.value
  db_colorS_msg.innerText = db_colorS.value
  db_colorL_msg.innerText = db_colorL.value
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

// 色変更系 =====================================================
function mLine(event){
//  mabuta.clearRect(0, 0, canvas_size, canvas_size) ;
  mabuta.fillStyle = "rgba(255,255,255,255)" ;
//  mabuta.rect(0, 0, canvas_size, canvas_size); //clear

  mabuta.moveTo(0,410) ;
  mabuta.lineTo(70,410) ;
  mabuta.lineTo(260,220) ;
  mabuta.lineTo(550,150) ;
  mabuta.lineTo(470,400) ;
  mabuta.lineTo(71,411) ;
  mabuta.lineTo(0,411) ;
  mabuta.lineTo(0,canvas_size) ;
  mabuta.lineTo(canvas_size,canvas_size) ;
  mabuta.lineTo(canvas_size,0) ;
  mabuta.lineTo(0,0) ;
  mabuta.closePath() ;
  mabuta.stroke() ;
  mabuta.fill() ;
  mabuta.globalAlpha = 128 ;
}

function init() {
 rLine();
 nLine();
 dLine();
}
}
//画面＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//https://gray-code.com/javascript/create-new-html-element/
// ul要素を作成
//入れ物。実物はappendChildしたやつ。

var canvasName = ["黒目[輪郭]","虹彩","瞳孔","内輪郭","虹彩"];
var canvasContext = [];

//size,[step, min, max, value]
//bold,[step, min, max, value]
//collor[H,S,L]
var preset_param_line = [
[[100,500,600, 50],[5,5,  5, 5],[0,  0,  5]],    //外郭
[[ 10,200,300,250],[5,5,100, 5],[0,  0,  5],[0, 90, 80]],    //輪郭
[[  5,  0,200, 80],[1,0, 20,10],[0,  0,  5],[0, 11, 40]],    //瞳孔
[[ 10,200,300,240],[5,5,100, 5],[0, 50, 50],[0, 90, 30]],    //内輪郭
];

//numOf,[step, min, max, value]
//bold,[step, min, max, value]
//long,[step, min, max, value]
//collor[H,S,L]
var preset_param_iris = [
[[  5,0  ,200, 50],[1,1,  5, 1],[10, 40,100, 80],[270,100, 50]],    //虹彩
];

var ul_element = document.createElement('ul');

function canvasInit (canvasContaier){
　//レイヤーボタン生成
  var layer_button = document.getElementById('layer_button') ;
  layer_button.appendChild(ul_element) ;

  layernum = 7 - canvasName.length;
  for(i = 0; i < layernum ; i++ ){
      canvasName.push("canvas" + i) ;
  }

　 var initNum = canvasName.length;
   for(i = 0; i < initNum ; i++ ) {
      var canvas = document.createElement("canvas");
      canvas.width = canvas_size ;
      canvas.height = canvas_size ;
      canvas.id = i ;
      add(canvas, i);
   }
    //typeCircleSlider(contextIndex, contextIndexDep, type, createType)
    //typeIrisSlider(contextIndex, contextIndexDep, type)
   parameter_set_container.appendChild(typeCircleSlider(1, [2, 3], 1, "r"));　　 //外輪郭
   parameter_set_container.appendChild(typeIrisLNSlider(2, 1, 0)); 　　　//虹彩
   parameter_set_container.appendChild(typeIrisLNSlider(3, 1, 0)); 　　　//虹彩
   parameter_set_container.appendChild(typeCircleSlider(4,"", 2, "r")); 　　//瞳孔

　　//初期描画(canvasIndex)
   baseAuto(canvasContext[0]); //外郭
   rLineAuto(1, [2, 3]);
   iLineAuto(2, 1);
   iLineAuto(3, 1);
   rLineAuto(4);
}

function newCanvas() {
    var add_canvas = document.createElement("canvas")
    var i = canvasName.length;
    canvasName.push("canvas" + i) ;
    add(add_canvas, i)
}

function add(canvas, index) {
    var add_canvas = canvas ;
    add_canvas.width = canvas_size ;
    add_canvas.height = canvas_size ;
    add_canvas.id = index ;

    //CSS
    add_canvas.style.position = "absolute" ;
    add_canvas.style.top = "0" ;
    add_canvas.style.left = "0" ;
    add_canvas.style.border = "1px solid #000000" ;
    add_canvas.style.zIndex = index ;

    canvasContaier.appendChild(add_canvas)

    add_canvas_context = add_canvas.getContext( "2d" ) ;
    canvasContext.push(add_canvas_context)

    //確認用
//    var iro = 50 * i ;
//    add_canvas_context.fillStyle = "hsl(" + iro + ", 50%, 50%)" ;
//    add_canvas_context.fillRect(10 * i, 10 * i, 10 * i + 10, 20 * i + 10);
//    add_canvas_context.stroke;

    var li_element = document.createElement('div');
    li_element.textContent = canvasName[i];
//    li_element.draggable = "true";
    li_element.class = "item"
    li_element.style.border = "1px solid #000000" ;

    var rm_el = document.createElement('input');
    rm_el.type = "button" ;
    rm_el.value = "削除";
    rm_el.id = i ;
    rm_el.onclick = function() { rem(rm_el) };
    li_element.appendChild(rm_el)

    ul_element.appendChild(li_element)
}

function rem(rm_el) {
    var index = rm_el.id;
    var indexChild = parseInt(rm_el.id) + 1;

    canvasName.splice(index, 1); //名前リスト
    canvasContext.splice(index, 1);　//実Canvas.ojbリスト
    canvasContaier.removeChild(canvasContaier.childNodes[indexChild]); //canvasHTMLリスト
    rm_el.parentNode.remove();　//レイヤーボタンリスト

    //レイヤーボタンのindex降り直し
    var i = 0;
    Array.from(ul_element.childNodes).forEach(function(li) {
        li.firstElementChild.id = i;   i++;
    })
}

//輪郭タイプ===================================================================================================
function baseAuto(context) {
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

function rLineAuto(contextIndex, contextIndexDepList){
  var context = canvasContext[contextIndex];
  var sizeEL = document.getElementById("rline_size" + contextIndex)
  var boldEL = document.getElementById("rline_bold" + contextIndex)
  context.beginPath() ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;
  context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  context.arc(
    0,  0,  // 円の中心座標
    sizeEL.value / 2 + boldEL.value / 2,           // 半径
    0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
    360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
    false                   // 方向: true=反時計回りの円、false=時計回りの円
    ) ;

  context.lineWidth = boldEL.value ; //太さ
  color(contextIndex, "stroke") ;
  color(contextIndex, "fill") ;
  context.translate( -canvas_size/2, -canvas_size/2 ) ;	//　戻す

  //値表示
  var sizeValueEL = sizeEL.parentNode.lastChild ;
  var boldValueEL = boldEL.parentNode.lastChild ;
  sizeValueEL.innerText = sizeEL.value / 100 + 'mm'
  boldValueEL.innerText = boldEL.value / 100 + 'mm'

  //サイズ連動
  if (contextIndexDepList.length > 0 ) {
      contextIndexDepList.forEach(function(contextIndexDep){
          iLineAuto(contextIndexDep, contextIndex)
      })
  }
}

//虹彩===================================================================================================
function iLineAuto(contextIndex, contextIndexDep){
  var context = canvasContext[contextIndex];
  var numOfEL = document.getElementById("iris_numOf" + contextIndex)
  var boldEL = document.getElementById("iris_bold" + contextIndex)
  var longEL = document.getElementById("iris_long" + contextIndex)

  var depSizeEL = document.getElementById("rline_size" + contextIndexDep)
  var depBoldEL = document.getElementById("rline_bold" + contextIndexDep)

  context.beginPath() ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;
  context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして
  context.lineWidth = boldEL.value ;

  var rad_now = 0 ;
  var lines = numOfEL.value ;
  var long = longEL.value ;
  var lise_size = (depSizeEL.value - depBoldEL.value ) / 2
  if (rad < 10) { rad = 5 ; }
  var rad_now = 360 ;
  if (lines == 0) { rad_now = -1 ; }

  while ( lines > 0 && rad_now > 0 ) {
    var rad = rad_now / lines
    var rad_run = Math.max(Math.floor( getRandomArbitrary(6, 14) ) / 10 * rad , 1) ; //0.3倍～1.4倍
    context.moveTo(long * getRandomArbitrary(7, 10) / 10, 0) ;
    context.lineTo(lise_size * getRandomArbitrary(9, 10) / 10, 0) ;
    context.rotate( rad_run * Math.PI / 180 ) ;
    //判定式
    lines -= 1
    rad_now -= rad_run
  }

  color(contextIndex, "stroke") ;
  context.translate( -canvas_size/2, -canvas_size/2 ) ; //　戻す

  //表示用
  var numOfValueEL = numOfEL.parentNode.lastChild ;
  var boldValueEL = boldEL.parentNode.lastChild ;
  var longValueEL = longEL.parentNode.lastChild ;
  numOfValueEL.innerText = numOfEL.value + '本'
  boldValueEL.innerText = boldEL.value / 100 + 'mm'
  longValueEL.innerText = longEL.value
}

//共通関数
function typeCircleSlider(contextIndex, contextIndexDep, type, createType) {
    var size_param_Set = preset_param_line[type][0]
    var bold_param_Set = preset_param_line[type][1]

    var container = document.createElement('div');
    container.className = "container" ;

    var h1 = document.createElement('p') ;
    h1.textContent = canvasName[contextIndex]　; container.appendChild(h1);
    //id, type, step, min, max, value, label
    var slider_size = sliderCreate(createType + "line_size" + contextIndex, "range", size_param_Set[0], size_param_Set[1], size_param_Set[2], size_param_Set[3], "サイズ") ;
    container.appendChild(slider_size) ;

    var slider_bold = sliderCreate(createType + "line_bold" + contextIndex, "range", bold_param_Set[0], bold_param_Set[1], bold_param_Set[2], bold_param_Set[3], "太さ") ;
    container.appendChild(slider_bold) ;


    var color_param_Set = preset_param_line[type][2] ;
    var h2 = document.createElement('p') ;
    h2.textContent = "輪郭色"　; container.appendChild(h2);
    var colorH = sliderCreate("colorHstroke" + contextIndex, "range", 5, 0, 100, color_param_Set[0], "色相[H]") ;
    container.appendChild(colorH) ;
    var colorS = sliderCreate("colorSstroke" + contextIndex, "range", 5, 0, 100, color_param_Set[1], "彩度[S]") ;
    container.appendChild(colorS) ;
    var colorL = sliderCreate("colorLstroke" + contextIndex, "range", 5, 0, 100, color_param_Set[2], "輝度[L]") ;
    container.appendChild(colorL) ;

    slider_size.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
    slider_bold.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
    colorH.addEventListener('input', function(){ color(contextIndex, "stroke"); });
    colorS.addEventListener('input', function(){ color(contextIndex, "stroke"); });
    colorL.addEventListener('input', function(){ color(contextIndex, "stroke"); });
    
    if (createType == "r") {
        var color_param_Set_fill = preset_param_line[type][3] ;
        var h3 = document.createElement('p') ;
        h3.textContent = "塗りつぶし色"　; container.appendChild(h3);
        var colorH_fill = sliderCreate("colorHfill" + contextIndex, "range", 5, 0, 360, color_param_Set_fill[0], "色相[H]") ;
        container.appendChild(colorH_fill) ;
        var colorS_fill = sliderCreate("colorSfill" + contextIndex, "range", 5, 0, 100, color_param_Set_fill[1], "彩度[S]") ;
        container.appendChild(colorS_fill) ;
        var colorL_fill = sliderCreate("colorLfill" + contextIndex, "range", 5, 0, 100, color_param_Set_fill[2], "輝度[L]") ;
        container.appendChild(colorL_fill) ;

        colorH_fill.addEventListener('input', function(){ color(contextIndex, "fill"); });
        colorS_fill.addEventListener('input', function(){ color(contextIndex, "fill"); });
        colorL_fill.addEventListener('input', function(){ color(contextIndex, "fill"); });
    }

    return container;
}

function typeIrisLNSlider(contextIndex, contextIndexDep, type) {
    var numOf_param_Set = preset_param_iris[type][0]
    var bold_param_Set = preset_param_iris[type][1]
    var long_param_Set = preset_param_iris[type][2]

    var container = document.createElement('div');
    container.className = "container" ;

    var h1 = document.createElement('p') ;
    h1.textContent = canvasName[contextIndex]　; container.appendChild(h1);
    //id, type, step, min, max, value, label
    var slider_numOf = sliderCreate("iris_numOf" + contextIndex, "range", numOf_param_Set[0], numOf_param_Set[1], numOf_param_Set[2], numOf_param_Set[3], "本数") ;
    container.appendChild(slider_numOf) ;
    var slider_bold = sliderCreate("iris_bold" + contextIndex, "range", bold_param_Set[0], bold_param_Set[1], bold_param_Set[2], bold_param_Set[3], "太さ") ;
    container.appendChild(slider_bold) ;
    var slider_long = sliderCreate("iris_long" + contextIndex, "range", long_param_Set[0], long_param_Set[1], long_param_Set[2], long_param_Set[3], "長さ") ;
    container.appendChild(slider_long) ;

    slider_numOf.addEventListener('input', function(){ iLineAuto(contextIndex, contextIndexDep); });
    slider_bold.addEventListener('input', function(){ iLineAuto(contextIndex, contextIndexDep); });
    slider_long.addEventListener('input', function(){ iLineAuto(contextIndex, contextIndexDep); });

    var color_param_Set = preset_param_iris[type][3] ;
    var h2 = document.createElement('p') ;
    h2.textContent = "虹彩色"　; container.appendChild(h2);
    var colorH = sliderCreate("colorHstroke" + contextIndex, "range", 5, 0, 360, color_param_Set[0], "色相[H]") ;
    container.appendChild(colorH) ;
    var colorS = sliderCreate("colorSstroke" + contextIndex, "range", 5, 0, 100, color_param_Set[1], "彩度[S]") ;
    container.appendChild(colorS) ;
    var colorL = sliderCreate("colorLstroke" + contextIndex, "range", 5, 0, 100, color_param_Set[2], "輝度[L]") ;
    container.appendChild(colorL) ;

    colorH.addEventListener('input', function(){ color(contextIndex, "stroke"); });
    colorS.addEventListener('input', function(){ color(contextIndex, "stroke"); });
    colorL.addEventListener('input', function(){ color(contextIndex, "stroke"); });

    return container;
}

function sliderCreate(id, type, step, min, max, value, label) {
   var sliderEl = document.createElement('input') ;
   var labelEl = document.createElement('label') ;
   var valueEL = document.createElement('b');
   var spanEl = document.createElement('span') ;
   sliderEl.id = id;
   sliderEl.type = type;
   sliderEl.step = step;
   sliderEl.min = min;
   sliderEl.max = max;
   sliderEl.value = value;
   labelEl.innerText = label;
   valueEL.innerText = sliderEl.value;
   valueEL.id = id + "_value";

   spanEl.appendChild(sliderEl)
   spanEl.appendChild(labelEl);
   spanEl.appendChild(valueEL);

   return spanEl;
}

function color(contextIndex, type) {
  var content = canvasContext[contextIndex];
  var colorH_EL = document.getElementById("colorH" + type + contextIndex)
  var colorS_EL = document.getElementById("colorS" + type + contextIndex)
  var colorL_EL = document.getElementById("colorL" + type + contextIndex)

  if (type == "stroke") {
    content.strokeStyle = "hsl(" + colorH_EL.value + ", " + colorS_EL.value + "%, " + colorL_EL.value + "%)" ;
    content.stroke() ;
  } else if (type == "fill") {
    content.fillStyle = "hsl(" + colorH_EL.value + ", " + colorS_EL.value + "%, " + colorL_EL.value + "%)" ;
    content.fill() ;
  }
}

// common =====================================================
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function iranai(){
  //https://dev.classmethod.jp/references/html5-drag-drop-api-review-dom/
//  var dragElement = null,
//      items = ul_element.getElementsByTagName("li")
//
//  function dragStartHandler(event) {
//      dragElement = event.target;
//      event.dataTransfer.setData('dragItem', dragElement.innerHTML);
//  }
//
//  function dragOverHandler(event) {
//      event.preventDefault();
//      event.dataTransfer.dropEffect = 'move';
//  }
//
//  function dropHandler(event) {
//      var dropElement = event.target;
//      event.stopPropagation();
//      dragElement.innerHTML = dropElement.innerHTML;
//      dropElement.innerHTML = event.dataTransfer.getData('dragItem');
//  }
//
//  Array.prototype.forEach.call(items, function (item) {
//      item.addEventListener('dragstart', dragStartHandler);
//      item.addEventListener('dragover', dragOverHandler);
//      item.addEventListener('drop', dropHandler);
//    }
//  );
//
//  Array.prototype.forEach.call(canvasName, function (canvasName) {
//      canvasName.addEventListener('dragstart', dragStartHandler);
//      canvasName.addEventListener('dragover', dragOverHandler);
//      canvasName.addEventListener('drop', dropHandler);
//    }
//  );
}