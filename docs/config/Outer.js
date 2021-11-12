
let Outer = jsyaml.load(`
id: "Outer"
name: "外郭"
sliderType: "Circle"
# line: #[step, min, max, value]
#     size:  [100,500,600,500]
#     bold:  [5,5,100,15]
#     color: [0,0,5]
sliderAll:
  - Name: "外郭"
    List:
      - idName: "rline_size"
        label: "サイズ"
        paramSet: [100,500,600,500]
      - idName: "rline_bold"
        label: "太さ"
        paramSet: [5,5,100,15]

  - Name: "色"
    List:
      - idName: "colorHfill"
        label: "色相[H]"
        paramSet: [5,0,360,0]
      - idName: "colorSfill"
        label: "彩度[S]"
        paramSet: [5,0,100,0]
      - idName: "colorLfill"
        label: "輝度[L]"
        paramSet: [5,0,100,5]
`);
