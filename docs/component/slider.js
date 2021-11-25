//レイヤーボタン系=======================================================================
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

function typeCommonSlider(canvasOBJ) {
    var index = canvasOBJ.index

    if (canvasOBJ.sliderType == "Img") {
        var imageOBJ = new Image();
        imageOBJ.src = canvasOBJ.url;  // 画像のURLを指定
        canvasOBJ.imageOBJ = imageOBJ ;
    }

    var container = document.createElement('div');
    container.className = "container" ;
    if (canvasOBJ.id === undefined) { container.id = "container" + index; }
    else { container.id = canvasOBJ.id + "Container"; }

    container.textContent = canvasOBJ.name;
    var initEL = createInitBottun(canvasOBJ) ;
    container.appendChild(initEL) ;
    container.appendChild(document.createElement('hr'))

    canvasOBJ.sliderAll.forEach(function(sliderList){
        var h2 = document.createElement('p') ;
        h2.textContent = sliderList.Name　;
        container.appendChild(h2);

        var functionType = sliderList.functionType
        sliderList.List.forEach(function(slider){
            slider = sliderCreate(slider.idName + index, "range", slider.paramSet[0], slider.paramSet[1], slider.paramSet[2], slider.paramSet[3], slider.label) ;
            container.appendChild(slider) ;
            //スライダーの種類でイベントを分ける。
            if (canvasOBJ.sliderType == "Circle") {
                slider.addEventListener('input', function(){ rLineAuto(canvasOBJ); });
            }
            if (canvasOBJ.sliderType == "Iris") {
                if (functionType == "line")  { slider.addEventListener('input', function(){ iLineAuto(canvasOBJ); }); }
                if (functionType == "color") { slider.addEventListener('input', function(){ color(index, "stroke", "stroke", canvasOBJ.context); }); }
            }
            if (canvasOBJ.sliderType == "Img") {
                slider.addEventListener('input', function(){ moveImage(canvasOBJ); });
            }
        });
        container.appendChild(document.createElement('hr'))
    });

    return container;
}
function createInitBottun(canvasOBJ) {
    var initEL = document.createElement('input');
    initEL.type = "button" ;
    initEL.value = "初期値へ";
//    initEL.id = canvasOBJ;
    canvasOBJ.initEL = initEL ;
    initEL.onclick = function() {
        canvasOBJ.sliderAll.forEach(function(sliderList){
            sliderList.List.forEach(function(slider){
                var EL = document.getElementById(slider.idName + canvasOBJ.index) ;
                EL.value = slider.paramSet[3] ;
            })
        })
        if (canvasOBJ.sliderType == "Circle") { rLineAuto(canvasOBJ) }
        if (canvasOBJ.sliderType == "Iris") { iLineAuto(canvasOBJ) }
        if (canvasOBJ.sliderType == "Img") { moveImage(canvasOBJ) }
    };
    return initEL
}
