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
    canvasParam.push(Iris1)
    canvasParam.push(Iris2)
    canvasParam.push(doukou)
}
canvasParamLoad();

var imageOBJ_kao = new Image();
imageOBJ_kao.src = kao.url ; // 画像のURLを指定
var imageOBJ_mabuta = new Image();
imageOBJ_mabuta.src = mabuta.url ; // 画像のURLを指定

//基本設定＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
var eyeScale = 0.8
var canvas_size_org= 680
var max_outline_size_org = 500
var canvas_size= 500 * eyeScale
var max_outline_size = max_outline_size_org * eyeScale
var outline_size_bold = 1

//画面＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//https://gray-code.com/javascript/create-new-html-element/
var kaoContaier = document.getElementById('kaoContainer');
var canvasContaier = document.getElementById('canvasContainer');
var parameter_set_container = document.getElementById('parameter_set_container');
var ul_element = document.createElement('ul');
var mabutaLayer = document.getElementById('mabutaLayer');

//コンテナ系ブロックのchildNodeは、Textノードが一番上なので、innerHTMLで初期化したら、既存のchildNodeindexとずれる。
//最初に全部消しておくとずれない
canvasContaier.innerHTML = '';
parameter_set_container.innerHTML = '';
ul_element.innerHTML = '';

var layer_button_div = document.getElementById('layer_button') ;
layer_button_div.innerHTML = '';
layer_button_div.appendChild(ul_element) ;

canvasContaier.width = canvas_size;
canvasContaier.height = canvas_size;

//初期画面＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function canvasInit (){
　  var initNum = canvasParam.length;
    var index = 0;
    console.log(canvasParam.length)
    canvasParam.forEach(function(canvasOBJ){
        canvasOBJ.index = index ;
        canvasOBJ.canvas = document.createElement("canvas");
        addContainer(canvasOBJ);
        createLayerBottun(canvasOBJ) ;
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
   setTimeout(() => { kaoInit() }, 300) ;
   setTimeout(() => { mabutaInit() }, 100) ;
}

function setViewContext(canvasOBJ) {
      var sliderType = canvasOBJ.sliderType
      var createType = canvasOBJ.createType
      if (canvasOBJ.dependency === undefined) { canvasOBJ.dependency = []; }

      if (sliderType == "Circle") {
          parameter_set_container.appendChild(typeCommonSlider(canvasOBJ));
          rLineAuto(canvasOBJ)
      }
      if (sliderType == "Iris") {
          parameter_set_container.appendChild(typeCommonSlider(canvasOBJ));
          iLineAuto(canvasOBJ)
      }
      if (sliderType == "Img") {
          parameter_set_container.appendChild(typeCommonSlider(canvasOBJ));
          moveImage(canvasOBJ)
      }
}

function newCanvas() {
    var index = canvasParam.length;
    var newItem = createNewItem();
    console.log(index)
    newItem.id =  "canvas" + index
    newItem.name = newItem.id;
    newItem.index = index ;

    var new_canvas = document.createElement("canvas")
    new_canvas.width = canvas_size ;
    new_canvas.height = canvas_size ;
    new_canvas.id = index ;
    newItem.canvas = new_canvas;

    return newItem
}

function newLayer() {
    var newObj = newCanvas();
    canvasParam.push(newObj);

    addContainer(newObj);
    createLayerBottun(newObj) ;
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
    add_canvas.style.border = "0px solid #000000" ;
    add_canvas.style.zIndex = canvasOBJ.index ;

    canvasContaier.appendChild(add_canvas)
    canvasOBJ.context  = add_canvas.getContext( "2d" ) ;
}

function canvasClear() {
    mabutaLayer.innerHTML = '';
    ul_element.innerHTML = '';
    canvasContaier.innerHTML = '';
    parameter_set_container.innerHTML = '';

    canvasParamLoad();
    canvasParam.forEach(function(item){
        item.context = undefined;
    });

    canvasInit();
}