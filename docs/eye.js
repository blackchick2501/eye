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
let canvasParam = [] ;

canvasParam.push(Outer)
canvasParam.push(rinkakuOut)
//canvasParam.push(rinkakuIn)
canvasParam.push(Iris1)
canvasParam.push(Iris2)
canvasParam.push(doukou)

//基本設定
var canvas_size= 660
var max_outline_size = 500
var outline_size_bold = 1

//画面＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//https://gray-code.com/javascript/create-new-html-element/
var canvasContaier = document.getElementById('canvasContainer');
var parameter_set_container = document.getElementById('parameter_set_container');
var layer_button = document.getElementById('layer_button') ;
var ul_element = document.createElement('ul');
layer_button.appendChild(ul_element) ;

function canvasInit (){
  var init_layer = 6 - canvasParam.length;
  for(i = 1; i < init_layer; i++ ){
    console.log(i)
      var newItem = newCanvas();
      canvasParam.push(newItem);
  }

　 var initNum = canvasParam.length;
   for(var index = 0; index < initNum ; index++ ) {
      var canvas = document.createElement("canvas");
      canvas.width = canvas_size ;
      canvas.height = canvas_size ;
      canvas.id = index ;
      add(canvas, index);
      if( index == 0 ){
        var con = document.createElement("div");
        parameter_set_container.appendChild(con);
        continue;
      }
      setViewContent(index)
   }

　　//初期描画(canvasIndex)
   baseAuto(canvasParam[0].context); //外郭
}

function setViewContent(index) {
      var sliderType = canvasParam[index].sliderType
      var indexDep   = canvasParam[index].dependency
      if (indexDep === undefined) { indexDep = []; }
      var createType = canvasParam[index].createType

      if (sliderType == "Circle") {
          parameter_set_container.appendChild(typeCircleSlider(index, indexDep, createType ));
          rLineAuto(index, indexDep)
      }
      if (sliderType == "Iris") {
          parameter_set_container.appendChild(typeIrisLNSlider(index, indexDep));
          iLineAuto(index, indexDep)
      }
}

function newCanvas() {
    var index = canvasParam.length;
    var newItem = jsyaml.load(`
          id: valid
          name: valid
          sliderType: "Circle"
          createType: "move"
          line: #[step, min, max, value]
              size:  [1,0,300, 10]
              bold:  [1,0,300, 5]
              color: [0,90,90]
    `);
    var id =  "canvas" + index
    newItem.id = id;
    newItem.name = id;

    var add_canvas = document.createElement("canvas")
    add_canvas.width = canvas_size ;
    add_canvas.height = canvas_size ;
    add_canvas.id = id ;
    newItem.context = add_canvas;

    return newItem
}

function newItem() {
    var newObj = newCanvas();
    canvasParam.push(newObj);

    var index = canvasParam.length - 1;
    var canvas = canvasParam[index].context;
    add(canvas, index);

    setViewContent(index)
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
    canvasParam[index].context = add_canvas_context

    var li_element = document.createElement('div');
    li_element.textContent = canvasParam[index].name;
//    li_element.draggable = "true";
    li_element.class = "item"
    li_element.style.border = "1px solid #000000" ;

    var rm_el = document.createElement('input');
    rm_el.type = "button" ;
    rm_el.value = "表示/非表示";
    rm_el.id = index ;
    rm_el.onclick = function() { rem(rm_el) };
    li_element.appendChild(rm_el)

    ul_element.appendChild(li_element)
}

function rem(rm_el) {
    var index = rm_el.id;
    var indexChild = parseInt(rm_el.id) + 1;
//
//    canvasParam.splice(index, 1); //名前リスト
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
        parameter_set_container.childNodes[indexChild].style.display = "none";
    } else {
        canvasContaier.childNodes[indexChild].style.visibility = "visible";
        parameter_set_container.childNodes[indexChild].style.display = "block";
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

function rLineAuto(index, indexDepList){
  var context = canvasParam[index].context;
  var containerEL = document.getElementById("container" + index)
  var sizeEL = document.getElementById("rline_size" + index)
  var boldEL = document.getElementById("rline_bold" + index)
  var moveXEL = ""
  var moveYEL = ""
  var center_x = 0
  var center_y = 0
  if (canvasParam[index].createType == "move") {
    moveXEL = document.getElementById("rx_move" + index)
    moveYEL = document.getElementById("ry_move" + index)
    center_x = moveXEL.value
    center_y = moveYEL.value
  }

  context.beginPath() ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;
  context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  //内輪差がめんどいので、塗りつぶしで輪郭を表現
  context.arc(
    center_x,  center_y,  // 円の中心座標
    sizeEL.value / 2 + boldEL.value / 1,　　　// 半径
    0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
    360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
    false                   // 方向: true=反時計回りの円、false=時計回りの円
  ) ;
  color(index, "fillOuter") ;

  if (canvasParam[index].createType == "fill") {
      context.beginPath() ;
      context.arc(
        0,  0,  // 円の中心座標
        sizeEL.value / 2,　　　// 半径
        0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
        360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
        false                   // 方向: true=反時計回りの円、false=時計回りの円
      ) ;
      color(index, "fill") ;
  }
  context.translate( -canvas_size/2, -canvas_size/2 ) ;	//　戻す

  //値表示
  var sizeValueEL = sizeEL.parentNode.lastChild ;
  var boldValueEL = boldEL.parentNode.lastChild ;
  sizeValueEL.innerText = sizeEL.value / 100 + 'mm'
  boldValueEL.innerText = boldEL.value / 100 + 'mm'

  //サイズ連動
  indexDepList.forEach(function(indexDep){
      if (canvasParam[indexDep].context !== undefined ) { iLineAuto(indexDep, index) }
  })
}

//虹彩===================================================================================================
function iLineAuto(index, indexDep){
  var context = canvasParam[index].context;
  var numOfEL = document.getElementById("iris_numOf" + index)
  var boldEL = document.getElementById("iris_bold" + index)
  var longEL = document.getElementById("iris_long" + index)
  var depSizeEL = document.getElementById("rline_size" + indexDep)
  var depBoldEL = document.getElementById("rline_bold" + indexDep)

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

  color(index, "stroke") ;
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
function typeCircleSlider(index, indexDep, createType) {
    var size_param_Set = canvasParam[index].line.size
    var bold_param_Set = canvasParam[index].line.bold

    var container = document.createElement('div');
    container.className = "container" ;
    container.id = "container" + index;
    container.dataset.createType = createType;

    var h1 = document.createElement('p') ;
    h1.textContent = canvasParam[index].name　; container.appendChild(h1);
    //id, type, step, min, max, value, label
    var slider_size = sliderCreate("rline_size" + index, "range", size_param_Set[0], size_param_Set[1], size_param_Set[2], size_param_Set[3], "サイズ") ;
    container.appendChild(slider_size) ;
    slider_size.addEventListener('input', function(){ rLineAuto(index, indexDep); });

    var slider_bold = sliderCreate("rline_bold" + index, "range", bold_param_Set[0], bold_param_Set[1], bold_param_Set[2], bold_param_Set[3], "太さ") ;
    container.appendChild(slider_bold) ;
    slider_bold.addEventListener('input', function(){ rLineAuto(index, indexDep); });


    var color_param_Set = canvasParam[index].line.color ;
    var h2 = document.createElement('p') ;
    h2.textContent = "輪郭色"　; container.appendChild(h2);
    var colorH = sliderCreate("colorHfillOuter" + index, "range", 5, 0, 360, color_param_Set[0], "色相[H]") ;
    container.appendChild(colorH) ;
    var colorS = sliderCreate("colorSfillOuter" + index, "range", 5, 0, 100, color_param_Set[1], "彩度[S]") ;
    container.appendChild(colorS) ;
    var colorL = sliderCreate("colorLfillOuter" + index, "range", 5, 0, 100, color_param_Set[2], "輝度[L]") ;
    container.appendChild(colorL) ;

    colorH.addEventListener('input', function(){ rLineAuto(index, indexDep); });
    colorS.addEventListener('input', function(){ rLineAuto(index, indexDep); });
    colorL.addEventListener('input', function(){ rLineAuto(index, indexDep); });
    
    if (createType == "fill") {
        var color_param_Set_fill = canvasParam[index].fill.color ;
        var h3 = document.createElement('p') ;
        h3.textContent = "塗りつぶし色"　; container.appendChild(h3);
        var colorH_fill = sliderCreate("colorHfill" + index, "range", 5, 0, 360, color_param_Set_fill[0], "色相[H]") ;
        container.appendChild(colorH_fill) ;
        var colorS_fill = sliderCreate("colorSfill" + index, "range", 5, 0, 100, color_param_Set_fill[1], "彩度[S]") ;
        container.appendChild(colorS_fill) ;
        var colorL_fill = sliderCreate("colorLfill" + index, "range", 5, 0, 100, color_param_Set_fill[2], "輝度[L]") ;
        container.appendChild(colorL_fill) ;

        colorH_fill.addEventListener('input', function(){ rLineAuto(index, indexDep); });
        colorS_fill.addEventListener('input', function(){ rLineAuto(index, indexDep); });
        colorL_fill.addEventListener('input', function(){ rLineAuto(index, indexDep); });
    }

    if (createType == "move") {
        var h3 = document.createElement('p') ;
        h3.textContent = "表示位置"　; container.appendChild(h3);
        var slider_x = sliderCreate("rx_move" + index, "range", 1, -canvas_size/2, canvas_size/2, 0, "X") ;
        container.appendChild(slider_x) ;
        slider_x.addEventListener('input', function(){ rLineAuto(index, indexDep); });

        var slider_y = sliderCreate("ry_move" + index, "range", 1, -canvas_size/2, canvas_size/2, 0, "Y") ;
        container.appendChild(slider_y) ;
        slider_y.addEventListener('input', function(){ rLineAuto(index, indexDep); });
    }
    return container;
}

function typeIrisLNSlider(index, indexDep) {
    var numOf_param_Set = canvasParam[index].line.numOf
    var bold_param_Set = canvasParam[index].line.bold
    var long_param_Set = canvasParam[index].line.long
//    var rad_param_Set = canvasParam[index].line.rad
    var color_param_Set = canvasParam[index].line.color ;

    var container = document.createElement('div');
    container.className = "container" ;

    var h1 = document.createElement('p') ;
    h1.textContent = canvasParam[index].name　; container.appendChild(h1);
    //id, type, step, min, max, value, label
    var slider_numOf = sliderCreate("iris_numOf" + index, "range", numOf_param_Set[0], numOf_param_Set[1], numOf_param_Set[2], numOf_param_Set[3], "本数") ;
    container.appendChild(slider_numOf) ;
    var slider_bold = sliderCreate("iris_bold" + index, "range", bold_param_Set[0], bold_param_Set[1], bold_param_Set[2], bold_param_Set[3], "太さ") ;
    container.appendChild(slider_bold) ;
    var slider_long = sliderCreate("iris_long" + index, "range", long_param_Set[0], long_param_Set[1], long_param_Set[2], long_param_Set[3], "長さ") ;
    container.appendChild(slider_long) ;
//    var slider_rad = sliderCreate("iris_rad" + index, "range", rad_param_Set[0], rad_param_Set[1], rad_param_Set[2], rad_param_Set[3], "回転角") ;
//    container.appendChild(slider_rad) ;

    slider_numOf.addEventListener('input', function(){ iLineAuto(index, indexDep); });
    slider_bold.addEventListener('input', function(){ iLineAuto(index, indexDep); });
    slider_long.addEventListener('input', function(){ iLineAuto(index, indexDep); });
//    slider_rad.addEventListener('input', function(){ iLineRotato(index, indexDep); });


    var h2 = document.createElement('p') ;
    h2.textContent = "虹彩色"　; container.appendChild(h2);
    var colorH = sliderCreate("colorHstroke" + index, "range", 5, 0, 360, color_param_Set[0], "色相[H]") ;
    container.appendChild(colorH) ;
    var colorS = sliderCreate("colorSstroke" + index, "range", 5, 0, 100, color_param_Set[1], "彩度[S]") ;
    container.appendChild(colorS) ;
    var colorL = sliderCreate("colorLstroke" + index, "range", 5, 0, 100, color_param_Set[2], "輝度[L]") ;
    container.appendChild(colorL) ;

    colorH.addEventListener('input', function(){ color(index, "stroke"); });
    colorS.addEventListener('input', function(){ color(index, "stroke"); });
    colorL.addEventListener('input', function(){ color(index, "stroke"); });

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

function color(index, type) {
  var content = canvasParam[index].context;
  var colorH_EL = document.getElementById("colorH" + type + index)
  var colorS_EL = document.getElementById("colorS" + type + index)
  var colorL_EL = document.getElementById("colorL" + type + index)

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

function canvasClear() {
    canvasContaier.innerHTML = '';
    parameter_set_container.innerHTML = '';
    ul_element.innerHTML = '';

    canvasParam.forEach(function(item){
        item.context = undefined;
    });

    canvasInit();
}