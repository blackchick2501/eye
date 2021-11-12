
let doukou = jsyaml.load(`
id: "doukou"
name: "瞳孔"
sliderType: "Circle"
createType: "fill"
# line: #[step, min, max, value]
#     size:  [5,0,200,55]
#     bold:  [1,0,20,12]
#     color: [195,100,70]
# fill:
#     color: [230,100,60]
sliderAll:
  - Name: "輪郭"
    List:
      - idName: "rline_size"
        label: "サイズ"
        paramSet: [5,0,200,55]
      - idName: "rline_bold"
        label: "太さ"
        paramSet: [1,0,20,12]
  - Name: "輪郭色"
    List:
      - idName: "colorHfill"
        label: "色相[H]"
        paramSet: [5,0,360,195]
      - idName: "colorSfill"
        label: "彩度[S]"
        paramSet: [5,0,100,100]
      - idName: "colorLfill"
        label: "輝度[L]"
        paramSet: [5,0,100,70]
  - Name: "塗りつぶし色"
    List:
      - idName: "colorHfillOuter"
        label: "色相[H]"
        paramSet: [5,0,360,230]
      - idName: "colorSfillOuter"
        label: "彩度[S]"
        paramSet: [5,0,100,100]
      - idName: "colorLfillOuter"
        label: "輝度[L]"
        paramSet: [5,0,100,60]
`);
