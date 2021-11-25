
let rinkakuOut = jsyaml.load(`
id: "rinkakuOut"
name: "黒目[輪郭]"
dependency: [2,3]
sliderType: "Circle"
createType: "fill"
sliderAll:
  - Name: "輪郭"
    id: "line"
    List:
      - idName: "rline_size"
        label: "サイズ"
        paramSet: [10,80,400,250]
      - idName: "rline_bold"
        label: "太さ"
        paramSet: [5,5,100,15]

  - Name: "輪郭色"
    id: "color"
    List:
      - idName: "colorHfillOuter"
        label: "色相[H]"
        paramSet: [5,0,360,0]
      - idName: "colorSfillOuter"
        label: "彩度[S]"
        paramSet: [5,0,100,0]
      - idName: "colorLfillOuter"
        label: "輝度[L]"
        paramSet: [5,0,100,5]

  - Name: "塗り色"
    id: "fill"
    List:
      - idName: "colorHfill"
        label: "色相[H]"
        paramSet: [5,0,360,190]
      - idName: "colorSfill"
        label: "彩度[S]"
        paramSet: [5,0,100,90]
      - idName: "colorLfill"
        label: "輝度[L]"
        paramSet: [5,0,100,90]
`);
