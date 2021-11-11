
let rinkakuOut = jsyaml.load(`
id: "rinkakuOut"
name: "黒目[輪郭]"
dependency: [2,3]
sliderType: "Circle"
createType: "fill"
line: #[step, min, max, value]
    size:  [10,200,300,250]
    bold:  [5,5,100,15]
    color: [0,0,5]
fill:
    color: [190,90,90]
`);
