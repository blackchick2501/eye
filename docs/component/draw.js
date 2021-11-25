
//輪郭タイプ===================================================================================================
function kaoInit() {
    var canvas = document.getElementById("kaoCanvas")
    canvas.width = canvas_size_org ;
    canvas.height = canvas_size_org ;
    canvas.style.zIndex = 99 ;

    var context  = canvas.getContext( "2d" ) ;
    context.beginPath() ;
    context.clearRect(0, 0, canvas_size, canvas_size) ;

    context.drawImage(
        imageOBJ_kao, //画像OBJ
        0,  //描画位置x -1/2 scale（中心)　＋ x
        0,　//描画位置y -1/2 scale（中心)　＋ y
        canvas_size_org,　　//画像サイズx
        canvas_size_org,　　//画像サイズy
    );
}

//輪郭タイプ===================================================================================================
function mabutaInit() {
    var canvasOBJ = mabuta;
    canvasOBJ.canvas = document.getElementById("mabutaCanvas") ;
    canvasOBJ.canvas.width = canvas_size ;
    canvasOBJ.canvas.height = canvas_size ;
    canvasOBJ.canvas.style.zIndex = 90 ;
    canvasOBJ.context = canvasOBJ.canvas.getContext( "2d" ) ;

    mabutaLayer.appendChild(typeCommonSlider(canvasOBJ)) ;
    moveImage(canvasOBJ);
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

//輪郭タイプ===================================================================================================
function rLineAuto(canvasOBJ){
  var context = canvasOBJ.context;
  var index = canvasOBJ.index;
  var containerEL = document.getElementById("container" + index)
  var sizeEL = document.getElementById("rline_size" + index)
  var boldEL = document.getElementById("rline_bold" + index)
  var sizeVAL = sizeEL.value * eyeScale
  var boldVAL = boldEL.value * eyeScale
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
  pathCircle(context, center_x, center_y, sizeVAL / 2 + boldVAL / 1) ;
  //index, createType, drawType
  color(index, "fillOuter", "fill", context) ;

  if (canvasOBJ.createType == "fill") {
      context.beginPath() ;
      pathCircle(context, 0, 0, sizeVAL / 2);
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

  var boldVAL = boldEL.value * eyeScale
  var longVAL = longEL.value * eyeScale
  var depSizeVAL = depSizeEL.value * eyeScale
  var depBoldVAL = depBoldEL.value * eyeScale

  context.beginPath() ;
  context.clearRect(0, 0, canvas_size, canvas_size) ;
  context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして
  context.lineWidth = boldEL.value ;

  var rad_now = 0 ;
  var lines = numOfEL.value ;
  var long = longVAL ;
  var lise_size = depSizeVAL / 2
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

//輪郭タイプ===================================================================================================
function moveImage(canvasOBJ) {
    var context = canvasOBJ.context;
    var index = canvasOBJ.index;

    var moveXEL = document.getElementById("move_img_x" + index)
    var moveYEL = document.getElementById("move_img_y" + index)
    var scaleEL = document.getElementById("move_img_scale" + index)
    var scale_xEL = document.getElementById("move_img_scale_x" + index)
    var scale_yEL = document.getElementById("move_img_scale_y" + index)
    var radEL = document.getElementById("move_img_rad" + index)

    context.beginPath() ;
    context.clearRect(0, 0, canvas_size, canvas_size) ;
    context.translate( canvas_size/2, canvas_size/2 ) ;	// 1: 水平位置、垂直位置をcanvasの半分だけずらして
    context.rotate( radEL.value * Math.PI / 180) ;

    var scaleX = scale_xEL.value/1
    var scaleY = scale_yEL.value/1
    var x = moveXEL.value
    var y = moveYEL.value
    var scale = canvas_size * scaleEL.value/1;

    context.drawImage(
        canvasOBJ.imageOBJ, //画像OBJ
        x - scale/2 * scaleX,  //描画位置x -1/2 scale（中心)　＋ x
        y - scale/2 * scaleY,　//描画位置y -1/2 scale（中心)　＋ y
        scale * scaleX,　　//画像サイズx
        scale * scaleY,　　//画像サイズy
    );

    context.rotate( - radEL.value * Math.PI / 180) ; //　戻す
    context.translate( -canvas_size/2, -canvas_size/2 ) ; //　戻す

    //値表示
    var moveXValueEL = moveXEL.parentNode.lastChild ;
    var moveYValueEL = moveYEL.parentNode.lastChild ;
    var scaleValueEL = scaleEL.parentNode.lastChild ;
    var scaleXValueEL = scale_xEL.parentNode.lastChild ;
    var scaleYValueEL = scale_yEL.parentNode.lastChild ;
    var radValueEL = radEL.parentNode.lastChild ;

    moveXValueEL.innerText = moveXEL.value / 100 + 'mm'
    moveYValueEL.innerText = moveYEL.value / 100 + 'mm'
    scaleValueEL.innerText = scaleEL.value/1;
    scaleXValueEL.innerText = scale_xEL.value
    scaleYValueEL.innerText = scale_yEL.value
    radValueEL.innerText = radEL.value
}