function getParam( name, url ){
  if( !url ) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if( !results ) return null;
  if( !results[2] ) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//https://www.yoheim.net/blog.php?q=20170201

let data1 = jsyaml.load(`
-
    id: "Outer"
    name: "外郭"
    sliderType: "Circle"
    createType: "fill"
    line: #[step, min, max, value]
        size:  [100,500,600, 50]
        bold:  [100,500,600, 50]
        color: [0,0,100]
    fill:
        color: [0,0,100]
-
    id: "rinkaku-out"
    name: "黒目[輪郭]"
    sliderType: "Circle"
    createType: "fill"
    line: #[step, min, max, value]
        size:  [100,500,600, 50]
        bold:  [100,500,600, 50]
        color: [0,0,100]
    fill:
        color: [0,0,100]
-
    id: "rinkaku-in"
    name: "黒目[中輪郭]"
    sliderType: "Circle"
    createType: "line"
    line: #[step, min, max, value]
        size:  [100,500,600, 50]
        bold:  [100,500,600, 50]
        color: [0,0,100]
-
    id: "Iris1"
    name: "虹彩1"
    dependency: "rinkaku-out"
    sliderType: "Iris"
    createType: ""
    line: #[step, min, max, value]
        numOf: [5,0,200,20]
        bold:  [1,1,5,2]
        long:  [10,40,100,80]
        rad:   [1,0,360,0]
        color: [270,100,80]
-
    id: "Iris2"
    name: "虹彩2"
    dependency: "rinkaku-out"
    sliderType: "Iris"
    createType: ""
    line: #[step, min, max, value]
        numOf: [5,0,200,20]
        bold:  [1,1,5,2]
        long:  [10,40,100,80]
        rad:   [1,0,360,0]
        color: [200,100,80]
`);
console.log(data1); // => { greeting: "hello", name: "world" }

//基本設定
var canvas_size= 660
var max_outline_size = 500
var outline_size_bold = 1

//画面＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//https://gray-code.com/javascript/create-new-html-element/
// ul要素を作成
//入れ物。実物はappendChildしたやつ。

var canvasName = ["外郭","黒目[輪郭]","黒目[中輪郭]","虹彩1","虹彩2","瞳孔","内輪郭"];
var canvasContext = [];

//size,[step, min, max, value]
//bold,[step, min, max, value]
//collor[H,S,L]
var preset_param_line = [
[[100,500,600, 50],[5,5,  5, 5],[0,  0,  5]],    //外郭
[[ 10,200,300,250],[5,5,100,15],[0,  0,  5],[190, 90, 90]],    //輪郭
[[ 10,200,300,240],[5,5,100,15],[0, 50, 50],[0, 90, 30]],    //内輪郭
[[  5,  0,200, 55],[1,0, 20,12],[195,100, 70],[230, 100, 60]],    //瞳孔
];

//numOf,[step, min, max, value]
//bold,[step, min, max, value]
//long,[step, min, max, value]
//rad,[step, min, max, value]
//collor[H,S,L]
var preset_param_iris = [
[[  5,0  ,200, 20],[1,1,  5, 3],[10, 40,100, 60],[1, 0,360, 0],[270, 95,100]],    //虹彩
[[  5,0  ,200, 20],[1,1,  5, 3],[10, 40,100, 60],[1, 0,360, 0],[200,100, 45]],    //虹彩
];

var ul_element = document.createElement('ul');

function canvasInit (canvasContaier){
　//初期化

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
    //typeCircleSlider(contextIndex, contextIndexDep[], presetType, createType)
    //typeIrisSlider(contextIndex, contextIndexDep, presetType)
   parameter_set_container.appendChild(typeCircleSlider(1, [4, 3], 1, "fill"));　　 //外輪郭
//   parameter_set_container.appendChild(typeCircleSlider(2, [], 2, ""));　　 //中輪郭
   parameter_set_container.appendChild(typeIrisLNSlider(3, 1, 0)); 　　　//虹彩1
   parameter_set_container.appendChild(typeIrisLNSlider(4, 1, 1)); 　　　//虹彩2
   parameter_set_container.appendChild(typeCircleSlider(5, [], 3, "fill")); 　　//瞳孔

　　//初期描画(canvasIndex)
   baseAuto(canvasContext[0]); //外郭
   rLineAuto(1, [4, 3]);
//   rLineAuto(2, []);
   iLineAuto(3, 1);
   iLineAuto(4, 1);
   rLineAuto(5, []);
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
    rm_el.value = "表示/非表示";
    rm_el.id = i ;
    rm_el.onclick = function() { rem(rm_el) };
    li_element.appendChild(rm_el)

    ul_element.appendChild(li_element)
}

function rem(rm_el) {
    var index = rm_el.id;
    var indexChild = parseInt(rm_el.id) + 1;
//
//    canvasName.splice(index, 1); //名前リスト
//    canvasContext.splice(index, 1);　//実Canvas.ojbリスト
//    canvasContaier.removeChild(canvasContaier.childNodes[indexChild]); //canvasHTMLリスト
//    rm_el.parentNode.remove();　//レイヤーボタンリスト
//
//    //レイヤーボタンのindex降り直し
//    var i = 0;
//    Array.from(ul_element.childNodes).forEach(function(li) {
//        li.firstElementChild.id = i;   i++;
//    })
    if (canvasContaier.childNodes[indexChild].style.visibility != "hidden") {
        canvasContaier.childNodes[indexChild].style.visibility = "hidden";
    } else {
        canvasContaier.childNodes[indexChild].style.visibility = "visible";
    }
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
  var containerEL = document.getElementById("container" + contextIndex)
  var sizeEL = document.getElementById("rline_size" + contextIndex)
  var boldEL = document.getElementById("rline_bold" + contextIndex)

  context.beginPath() ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;
  context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  //内輪差がめんどいので、塗りつぶしで輪郭を表現
  context.arc(
    0,  0,  // 円の中心座標
    sizeEL.value / 2 + boldEL.value / 1,　　　// 半径
    0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
    360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
    false                   // 方向: true=反時計回りの円、false=時計回りの円
  ) ;
  color(contextIndex, "fillOuter") ;

  context.beginPath() ;
  context.arc(
    0,  0,  // 円の中心座標
    sizeEL.value / 2,　　　// 半径
    0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
    360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
    false                   // 方向: true=反時計回りの円、false=時計回りの円
  ) ;
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
  var lise_size = (depSizeEL.value) / 2
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

function iLineRotato(contextIndex, contextIndexDep){
  var context = canvasContext[contextIndex];
  var radEL = document.getElementById("iris_rad" + contextIndex) ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;

  context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  context.save();
  context.rotate( 30 * Math.PI / 180 ) ;
  context.stroke() ;

  context.translate( -canvas_size/2, -canvas_size/2 ) ; //　戻す
  var radValueEL = radEL.parentNode.lastChild ;
  radValueEL.innerText = radEL.value
}

//共通関数
function typeCircleSlider(contextIndex, contextIndexDep, type, createType) {
    var size_param_Set = preset_param_line[type][0]
    var bold_param_Set = preset_param_line[type][1]

    var container = document.createElement('div');
    container.className = "container" ;
    container.id = "container" + contextIndex;
    container.dataset.createType = createType;

    var h1 = document.createElement('p') ;
    h1.textContent = canvasName[contextIndex]　; container.appendChild(h1);
    //id, type, step, min, max, value, label
    var slider_size = sliderCreate("rline_size" + contextIndex, "range", size_param_Set[0], size_param_Set[1], size_param_Set[2], size_param_Set[3], "サイズ") ;
    container.appendChild(slider_size) ;

    var slider_bold = sliderCreate("rline_bold" + contextIndex, "range", bold_param_Set[0], bold_param_Set[1], bold_param_Set[2], bold_param_Set[3], "太さ") ;
    container.appendChild(slider_bold) ;


    var color_param_Set = preset_param_line[type][2] ;
    var h2 = document.createElement('p') ;
    h2.textContent = "輪郭色"　; container.appendChild(h2);
    var colorH = sliderCreate("colorHfillOuter" + contextIndex, "range", 5, 0, 360, color_param_Set[0], "色相[H]") ;
    container.appendChild(colorH) ;
    var colorS = sliderCreate("colorSfillOuter" + contextIndex, "range", 5, 0, 100, color_param_Set[1], "彩度[S]") ;
    container.appendChild(colorS) ;
    var colorL = sliderCreate("colorLfillOuter" + contextIndex, "range", 5, 0, 100, color_param_Set[2], "輝度[L]") ;
    container.appendChild(colorL) ;

    slider_size.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
    slider_bold.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
//    colorH.addEventListener('input', function(){ color(contextIndex, "stroke"); });
//    colorS.addEventListener('input', function(){ color(contextIndex, "stroke"); });
//    colorL.addEventListener('input', function(){ color(contextIndex, "stroke"); });
    colorH.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
    colorS.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
    colorL.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
    
    if (createType == "fill") {
        var color_param_Set_fill = preset_param_line[type][3] ;
        var h3 = document.createElement('p') ;
        h3.textContent = "塗りつぶし色"　; container.appendChild(h3);
        var colorH_fill = sliderCreate("colorHfill" + contextIndex, "range", 5, 0, 360, color_param_Set_fill[0], "色相[H]") ;
        container.appendChild(colorH_fill) ;
        var colorS_fill = sliderCreate("colorSfill" + contextIndex, "range", 5, 0, 100, color_param_Set_fill[1], "彩度[S]") ;
        container.appendChild(colorS_fill) ;
        var colorL_fill = sliderCreate("colorLfill" + contextIndex, "range", 5, 0, 100, color_param_Set_fill[2], "輝度[L]") ;
        container.appendChild(colorL_fill) ;

//        colorH_fill.addEventListener('input', function(){ color(contextIndex, "fill"); });
//        colorS_fill.addEventListener('input', function(){ color(contextIndex, "fill"); });
//        colorL_fill.addEventListener('input', function(){ color(contextIndex, "fill"); });
        colorH_fill.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
        colorS_fill.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
        colorL_fill.addEventListener('input', function(){ rLineAuto(contextIndex, contextIndexDep); });
    }

    return container;
}

function typeIrisLNSlider(contextIndex, contextIndexDep, type) {
    var numOf_param_Set = preset_param_iris[type][0]
    var bold_param_Set = preset_param_iris[type][1]
    var long_param_Set = preset_param_iris[type][2]
//    var rad_param_Set = preset_param_iris[type][3]
    var color_param_Set = preset_param_iris[type][4] ;

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
//    var slider_rad = sliderCreate("iris_rad" + contextIndex, "range", rad_param_Set[0], rad_param_Set[1], rad_param_Set[2], rad_param_Set[3], "回転角") ;
//    container.appendChild(slider_rad) ;

    slider_numOf.addEventListener('input', function(){ iLineAuto(contextIndex, contextIndexDep); });
    slider_bold.addEventListener('input', function(){ iLineAuto(contextIndex, contextIndexDep); });
    slider_long.addEventListener('input', function(){ iLineAuto(contextIndex, contextIndexDep); });
//    slider_rad.addEventListener('input', function(){ iLineRotato(contextIndex, contextIndexDep); });


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

  colorH_EL.parentNode.lastChild.innerText = colorH_EL.value
  colorS_EL.parentNode.lastChild.innerText = colorS_EL.value
  colorL_EL.parentNode.lastChild.innerText = colorL_EL.value

  if (type == "stroke") {
    content.strokeStyle = "hsl(" + colorH_EL.value + ", " + colorS_EL.value + "%, " + colorL_EL.value + "%)" ;
    content.stroke() ;
  } else {
    content.fillStyle = "hsl(" + colorH_EL.value + ", " + colorS_EL.value + "%, " + colorL_EL.value + "%)" ;
    content.fill() ;
  }
}

function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }

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