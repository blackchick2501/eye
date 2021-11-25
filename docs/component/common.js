
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

function pathCircle(context, x, y, r) {
   context.arc(
     x,  y,  // 円の中心座標
     r,　　　 // 半径
     0 * Math.PI / 180,      // 開始角度: 0度 (0 * Math.PI / 180)
     360 * Math.PI / 180,    // 終了角度: 360度 (360 * Math.PI / 180)
     false                   // 方向: true=反時計回りの円、false=時計回りの円
   );
}