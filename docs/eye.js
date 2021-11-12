function getParam( name, url ){
  if( !url ) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if( !results ) return null;
  if( !results[2] ) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var canvasParam
//https://www.yoheim.net/blog.php?q=20170201
function canvasParamLoad(){
    canvasParam = [] ;

    canvasParam.push(Outer)
    canvasParam.push(rinkakuOut)
    //canvasParam.push(rinkakuIn)
    canvasParam.push(Iris1)
    canvasParam.push(Iris2)
    canvasParam.push(doukou)
    canvasParam.push(mabuta)
}
canvasParamLoad();


//基本設定＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
var canvas_size= 660
var max_outline_size = 500
var outline_size_bold = 1

//画面＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//https://gray-code.com/javascript/create-new-html-element/
var canvasContaier = document.getElementById('canvasContainer');
var parameter_set_container = document.getElementById('parameter_set_container');
var ul_element = document.createElement('ul');

//コンテナ系ブロックのchildNodeは、Textノードが一番上なので、innerHTMLで初期化したら、既存のchildNodeindexとずれる。
//最初に全部消しておくとずれない
canvasContaier.innerHTML = '';
parameter_set_container.innerHTML = '';
ul_element.innerHTML = '';

var layer_button = document.getElementById('layer_button') ;
layer_button.appendChild(ul_element) ;


//初期画面＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function canvasInit (){
    var init_layer = 6 - canvasParam.length;
    for(i = 1; i < init_layer; i++ ){
        console.log(i)
          var newItem = newCanvas();
          canvasParam.push(newItem);
    }

　  var initNum = canvasParam.length;
    var index = 0;
    console.log(canvasParam.length)
    canvasParam.forEach(function(canvasOBJ){
        canvasOBJ.index = index ;
        canvasOBJ.canvas = document.createElement("canvas");
        addContainer(canvasOBJ);
        if( index == 0 ){
            var con = document.createElement("div");
            parameter_set_container.appendChild(con);
        } else {
            setViewContext(canvasOBJ)
        }
        index++;
    });

　　//初期描画(canvasIndex)
   baseAuto(canvasParam[0].context); //外郭
}

function setViewContext(canvasOBJ) {
      var sliderType = canvasOBJ.sliderType
      var createType = canvasOBJ.createType
      if (canvasOBJ.dependency === undefined) { canvasOBJ.dependency = []; }

      if (sliderType == "Circle") {
          parameter_set_container.appendChild(typeCircleSlider(canvasOBJ));
          rLineAuto(canvasOBJ)
      }
      if (sliderType == "Iris") {
          parameter_set_container.appendChild(typeIrisLNSlider(canvasOBJ));
          iLineAuto(canvasOBJ)
      }
      if (sliderType == "Img") {
          parameter_set_container.appendChild(typeImgSlider(canvasOBJ));
          moveImage(canvasOBJ)
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
              size:  [1,0,300, 50]
              bold:  [1,0,300, 0]
              color: [200,95,99]
    `);
    newItem.id =  "canvas" + index
    newItem.name = newItem.id;

    var new_canvas = document.createElement("canvas")
    new_canvas.width = canvas_size ;
    new_canvas.height = canvas_size ;
    new_canvas.id = index ;
    newItem.canvas = new_canvas;
    newItem.index = index;

    return newItem
}

function newLayer() {
    var newObj = newCanvas();
    canvasParam.push(newObj);

    var index = canvasParam.length - 1;

    addContainer(newObj);
    setViewContext(newObj)
}

function addContainer(canvasOBJ) {
    var add_canvas = canvasOBJ.canvas ;
    var index = canvasOBJ.index

    add_canvas.width = canvas_size ;
    add_canvas.height = canvas_size ;

    //CSS
    add_canvas.style.position = "absolute" ;
    add_canvas.style.top = "0" ;
    add_canvas.style.left = "0" ;
    add_canvas.style.border = "1px solid #000000" ;
    add_canvas.style.zIndex = canvasOBJ.index ;

    canvasContaier.appendChild(add_canvas)
    canvasOBJ.context  = add_canvas.getContext( "2d" ) ;
    createLayerBottun(canvasOBJ) ;
}

function createLayerBottun(canvasOBJ) {
    var li_element = document.createElement('div');
    li_element.textContent = canvasOBJ.name;
    li_element.class = "item"
    li_element.style.border = "1px solid #000000" ;

    var visibilityEL = document.createElement('input');
    visibilityEL.type = "button" ;
    visibilityEL.value = "表示/非表示";
    visibilityEL.id = "visibility" + canvasOBJ.index ;
    visibilityEL.onclick = function() { hidden(canvasOBJ) };
    li_element.appendChild(visibilityEL)

    var dropEL = document.createElement('input');
    dropEL.type = "button" ;
    dropEL.value = "削除";
    dropEL.id = "drop" + canvasOBJ.index ;
    canvasOBJ.dropEL = dropEL ;
    dropEL.onclick = function() { drop(canvasOBJ) };
    li_element.appendChild(dropEL)

    ul_element.appendChild(li_element)
}

function hidden(canvasOBJ) {
    var indexChild = canvasOBJ.index;

    if (canvasContaier.childNodes[indexChild].style.visibility != "hidden") {
        canvasContaier.childNodes[indexChild].style.visibility = "hidden";
        parameter_set_container.childNodes[indexChild].style.display = "none";
    } else {
        canvasContaier.childNodes[indexChild].style.visibility = "visible";
        parameter_set_container.childNodes[indexChild].style.display = "block";
    }
}

function drop(canvasOBJ) {
//    console.log("Drop-start")
//    console.log("index" + canvasOBJ.index)
//    console.log(canvasParam)
//    console.log(canvasContaier)
//    console.log(parameter_set_container)
//    console.log(canvasOBJ.dropEL)
//    console.log(canvasContaier.childNodes[canvasOBJ.index])

    canvasContaier.removeChild(canvasContaier.childNodes[canvasOBJ.index]);
    parameter_set_container.removeChild(parameter_set_container.childNodes[canvasOBJ.index]);
    canvasOBJ.dropEL.parentNode.remove();　//レイヤーボタンリスト
    canvasParam.splice(canvasOBJ.index, 1); //オブジェクト削除

    //index降り直し
    var i = 0;
    canvasParam.forEach(function(obj) {
         obj.index = i ;
         obj.canvas.id = i ;
         obj.canvas.style.zindex = i ;
         i++;
    });
//    console.log(canvasParam)
//    console.log("Drop-end")
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

function rLineAuto(canvasOBJ){
  var context = canvasOBJ.context;
  var index = canvasOBJ.index;
  var containerEL = document.getElementById("container" + index)
  var sizeEL = document.getElementById("rline_size" + index)
  var boldEL = document.getElementById("rline_bold" + index)
  var moveXEL, moveYEL
  var center_x = 0
  var center_y = 0
  if (canvasOBJ.createType == "move") {
    moveXEL = document.getElementById("rx_move" + index)
    moveYEL = document.getElementById("ry_move" + index)
    center_x = moveXEL.value
    center_y = moveYEL.value
  }

  context.beginPath() ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;
  context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

  //内輪差がめんどいので、塗りつぶしで輪郭を表現
  pathCircle(context, center_x, center_y, sizeEL.value / 2 + boldEL.value / 1) ;
  //index, createType, drawType
  color(index, "fillOuter", "fill", context) ;

  if (canvasOBJ.createType == "fill") {
      context.beginPath() ;
      pathCircle(context, 0, 0, sizeEL.value / 2);
      color(index, "fill", "fill", context) ;
  }
  context.translate( -canvas_size/2, -canvas_size/2 ) ;	//　戻す

  //値表示
  var sizeValueEL = sizeEL.parentNode.lastChild ;
  var boldValueEL = boldEL.parentNode.lastChild ;
  sizeValueEL.innerText = sizeEL.value / 100 + 'mm'
  boldValueEL.innerText = boldEL.value / 100 + 'mm'

  //サイズ連動
  if (canvasOBJ.dependency !== undefined) {
    canvasOBJ.dependency.forEach(function(indexDep){
        if (canvasParam[indexDep].context !== undefined ) { iLineAuto(canvasParam[indexDep]) }
  });
  }
}

//虹彩===================================================================================================
function iLineAuto(canvasOBJ){
  var context = canvasOBJ.context;
  var index = canvasOBJ.index;
  var indexDep = canvasOBJ.dependency;
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

  color(index, "stroke", "stroke", context) ;
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
function typeCircleSlider(canvasOBJ) {
    var index = canvasOBJ.index
    var context = canvasOBJ.context

    var container = document.createElement('div');
    container.className = "container" ;
    container.id = "container" + index;

    canvasOBJ.sliderAll.forEach(function(sliderList){
        var h2 = document.createElement('p') ;
        h2.textContent = sliderList.Name　; container.appendChild(h2);

        sliderList.List.forEach(function(slider){
            slider = sliderCreate(slider.idName + index, "range", slider.paramSet[0], slider.paramSet[1], slider.paramSet[2], slider.paramSet[3], slider.label) ;
            container.appendChild(slider) ;
            slider.addEventListener('input', function(){ rLineAuto(canvasOBJ); });
        });
    });

    return container;
}

function typeIrisLNSlider(canvasOBJ) {
    var index = canvasOBJ.index

    var container = document.createElement('div');
    container.className = "container" ;
    container.id = "container" + index;

    canvasOBJ.sliderAll.forEach(function(sliderList){
        var h2 = document.createElement('p') ;
        h2.textContent = sliderList.Name　; container.appendChild(h2);
        var functionType = sliderList.functionType
        sliderList.List.forEach(function(slider){
            slider = sliderCreate(slider.idName + index, "range", slider.paramSet[0], slider.paramSet[1], slider.paramSet[2], slider.paramSet[3], slider.label) ;
            container.appendChild(slider) ;
            if (functionType == "line")  { slider.addEventListener('input', function(){ iLineAuto(canvasOBJ); }); }
            if (functionType == "color") { slider.addEventListener('input', function(){ color(index, "stroke", "stroke", canvasOBJ.context); }); }
        });
    });

    return container;
}

function typeImgSlider(canvasOBJ) {
    var index = canvasOBJ.index

    var mabuta = new Image();
    mabuta.src = canvasOBJ.url;  // 画像のURLを指定
    canvasOBJ.imageOBJ = mabuta ;

    var container = document.createElement('div');
    container.className = "container" ;
    container.id = "container" + index;

    canvasOBJ.sliderAll.forEach(function(sliderList){
        var h2 = document.createElement('p') ;
        h2.textContent = sliderList.Name　; container.appendChild(h2);
        var functionType = sliderList.functionType
        sliderList.List.forEach(function(slider){
            slider = sliderCreate(slider.idName + index, "range", slider.paramSet[0], slider.paramSet[1], slider.paramSet[2], slider.paramSet[3], slider.label) ;
            container.appendChild(slider) ;
            slider.addEventListener('input', function(){ moveImage(canvasOBJ); });
        });
    });

    return container;
}

function moveImage(canvasOBJ) {
    var context = canvasOBJ.context;
    var index = canvasOBJ.index;

    var moveXEL = document.getElementById("move_img_x" + index)
    var moveYEL = document.getElementById("move_img_y" + index)
    var scaleEL = document.getElementById("move_img_scale" + index)

    context.beginPath() ;
    context.clearRect(0, 0, canvas_size, canvas_size) ;
    context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして

    var x = moveXEL.value
    var y = moveYEL.value
    var scale = scaleEL.value/1 + canvas_size;

    context.drawImage(
        canvasOBJ.imageOBJ, //画像OBJ
        x - scale/2,  //描画位置x -1/2 scale（中心)　＋ x
        y - scale/2,　//描画位置y -1/2 scale（中心)　＋ y
        scale,　　//画像サイズx
        scale　　//画像サイズy
    );

    context.translate( -canvas_size/2, -canvas_size/2 ) ; //　戻す
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

function color(index, createType, drawType, context) {
  var colorH_EL = document.getElementById("colorH" + createType + index)
  var colorS_EL = document.getElementById("colorS" + createType + index)
  var colorL_EL = document.getElementById("colorL" + createType + index)

  colorH_EL.parentNode.lastChild.innerText = colorH_EL.value
  colorS_EL.parentNode.lastChild.innerText = colorS_EL.value
  colorL_EL.parentNode.lastChild.innerText = colorL_EL.value

  if (drawType == "stroke") {
    context.strokeStyle = "hsl(" + colorH_EL.value + ", " + colorS_EL.value + "%, " + colorL_EL.value + "%)" ;
    context.stroke() ;
  } else if (drawType == "fill") {
    context.fillStyle = "hsl(" + colorH_EL.value + ", " + colorS_EL.value + "%, " + colorL_EL.value + "%)" ;
    context.fill() ;
  }
}

function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }

function canvasClear() {
    canvasContaier.innerHTML = '';
    parameter_set_container.innerHTML = '';
    ul_element.innerHTML = '';

    canvasParamLoad();
    canvasParam.forEach(function(item){
        item.context = undefined;
    });

    canvasInit();
}

//var canvasTest = document.createElement("canvas");
//var contextTest = canvasTest.getContext('2d');
//var objX, objY;
//var objWidth, objHeight;
//
//canvasTest.width = canvas_size;
//canvasTest.height = canvas_size;
//
//function init() {
//  // オブジェクトの大きさを定義
//  objWidth = 50;
//  objHeight = 50;
//
//  // オブジェクトの座標を定義(キャンバスの中央に表示)
//  objX = canvasTest.width / 2 - objWidth / 2;
//  objY = canvasTest.height / 2 - objHeight / 2;
//
//  // オブジェクトを描画
//  contextTest.fillRect(objX, objY, objWidth, objHeight);
//}
//
//var x, y, relX, relY;
//var dragging = false;
//
//function onDown(e) {
//  // キャンバスの左上端の座標を取得
//  var offsetX = canvasTest.getBoundingClientRect().left;
//  var offsetY = canvasTest.getBoundingClientRect().top;
//
//  // マウスが押された座標を取得
//  x = e.clientX - offsetX;
//  y = e.clientY - offsetY;
//
//  // オブジェクト上の座標かどうかを判定
//  if (objX < x && (objX + objWidth) > x && objY < y && (objY + objHeight) > y) {
//    dragging = true; // ドラッグ開始
//    relX = objX - x;
//    relY = objY - y;
//  }
//}
//
//canvasTest.addEventListener('mousedown', onDown, false);
//
//function onMove(e) {
//  // キャンバスの左上端の座標を取得
//  var offsetX = canvasTest.getBoundingClientRect().left;
//  var offsetY = canvasTest.getBoundingClientRect().top;
//
//  // マウスが移動した先の座標を取得
//  x = e.clientX - offsetX;
//  y = e.clientY - offsetY;
//
//  // ドラッグが開始されていればオブジェクトの座標を更新して再描画
//  if (dragging) {
//    objX = x + relX;
//    objY = y + relY;
//    drawRect();
//  }
//}
//
//function onUp(e) {
//  dragging = false; // ドラッグ終了
//}
//
//function drawRect() {
//  contextTest.clearRect(0, 0, canvasTest.width, canvasTest.height); // キャンバスをクリア
//  contextTest.fillRect(objX, objY, objWidth, objHeight);
//}
//
//canvasTest.addEventListener('mousemove', onMove, false);
//canvasTest.addEventListener('mouseup', onUp, false);
//
//canvasContaier.append(canvasTest);
//init();

function pathCircle(context, x, y, r) {
   context.arc(
     x,  y,  // 円の中心座標
     r,　　　 // 半径
     0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
     360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
     false                   // 方向: true=反時計回りの円、false=時計回りの円
   );
}