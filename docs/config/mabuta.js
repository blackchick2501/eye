
let mabuta = jsyaml.load(`
id: "mabuta"
name: "まぶた"
dependency: [2,3]
sliderType: "Img"
createType: "mabuta"
# move:
#     x:  [5,-300,300,0]
#     y:  [5,-300,300,0]
#     scale: [5,-600,600,0]
#     rad: [0,0]
url: "./img/1.png"
sliderAll:
  - Name: "位置"
    id: "move"
    functionType: "move"
    List:
      - idName: "move_img_x"
        label: "X"
        paramSet: [5,-300,300,0]
      - idName: "move_img_y"
        label: "Y"
        paramSet: [5,-300,300,0]
      - idName: "move_img_scale"
        label: "scale"
        paramSet: [5,-600,600,0]
      - idName: "move_img_rad"
        label: "回転"
        paramSet: [5,0,360,0]

`);
