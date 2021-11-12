
let Iris2 = jsyaml.load(`
id: "Iris2"
name: "虹彩2"
dependency: [1]
sliderType: "Iris"
createType: ""
#line: #[step, min, max, value]
#    numOf: [5,0,200,20]
#    bold:  [1,1,5,3]
#    long:  [10,40,100,50]
#    rad:   [1,0,360,0]
#    color: [200,100,45]
sliderAll:
  - Name: "ライン"
    id: "line"
    functionType: "line"
    List:
      - idName: "iris_numOf"
        label: "本数"
        paramSet: [5,0,200,20]
      - idName: "iris_bold"
        label: "太さ"
        paramSet: [1,1,5,3]
      - idName: "iris_long"
        label: "長さ"
        paramSet: [10,40,100,50]

  - Name: "虹彩色"
    id: "color"
    functionType: "color"
    List:
      - idName: "colorHstroke"
        label: "色相[H]"
        paramSet: [5,0,360,200]
      - idName: "colorSstroke"
        label: "彩度[S]"
        paramSet: [5,0,100,100]
      - idName: "colorLstroke"
        label: "輝度[L]"
        paramSet: [5,0,100,45]

`);