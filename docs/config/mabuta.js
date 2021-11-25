
let mabuta = jsyaml.load(`
id: "mabuta"
name: "まぶた"
sliderType: "Img"
createType: "mabuta"
url: "./img/mabuta.png"
urlList:
  - "./img/mabuta.png"
  - "./img/mabuta2.png"
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
        paramSet: [0.1,1.5,5,2.2]
      - idName: "move_img_scale_x"
        label: "scale_x"
        paramSet: [0.1,0.4,2,1.2]
      - idName: "move_img_scale_y"
        label: "scale_y"
        paramSet: [0.1,0.4,2,1.3]
      - idName: "move_img_rad"
        label: "回転"
        paramSet: [1,-180,180,0]
`);
