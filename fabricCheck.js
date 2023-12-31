const fcanvas = new fabric.Canvas(document.querySelector('#fCanvas'), {
  width: 2870,
  height: 2114,
});
fcanvas.loadFromJSON(
  {
    version: '5.2.1',
    objects: [
      {
        type: 'textbox',
        version: '5.2.1',
        originX: 'left',
        originY: 'top',
        left: 1658.3238333565846,
        top: 921.2736472508516,
        width: 1000,
        height: 162.53471,
        fill: '#595959',
        stroke: null,
        strokeWidth: 1,
        strokeDashArray: null,
        strokeLineCap: 'butt',
        strokeDashOffset: 0,
        strokeLineJoin: 'miter',
        strokeUniform: false,
        strokeMiterLimit: 4,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        backgroundColor: 'transparent',
        fillRule: 'nonzero',
        paintFirst: 'fill',
        globalCompositeOperation: 'source-over',
        skewX: 0,
        skewY: 0,
        fontFamily: 'fontid-125',
        fontWeight: 'normal',
        fontSize: 85.28,
        text: 'Fffffffffffffffffffffff fffffffffffff ffffffffffffffff ffffffffffffffffffffffffffffffffffff',
        underline: false,
        overline: false,
        linethrough: false,
        textAlign: 'left',
        fontStyle: 'normal',
        lineHeight: 1.16,
        textBackgroundColor: '',
        charSpacing: 0,
        styles: {},
        direction: 'ltr',
        path: null,
        pathStartOffset: 0,
        pathSide: 'left',
        pathAlign: 'baseline',
        minWidth: 20,
        splitByGrapheme: false,
        name: 'userTextbox-2-02b0f00a-e29f-42c1-8270-496d770ed367',
        userDefined: true,
        data: {
          scaleX: 1,
          scaleY: 1,
          centerPoint: {
            x: 2188,
            y: 1057.267355,
          },
          currCenterPoint: {
            x: 2158.3238333565846,
            y: 1002.5410022508515,
          },
        },
      },
    ],
    backgroundImage: {
      type: 'image',
      version: '5.2.1',
      originX: 'left',
      originY: 'top',
      left: 0,
      top: 0,
      width: 2870,
      height: 2114,
      fill: 'transparent',
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
      cropX: 0,
      cropY: 0,
      src: 'https://content.stage.hallmark.com/webassets/PGM1305/PGM1305_P2-3_Background.png',
      crossOrigin: 'anonymous',
      filters: [],
    },
  },
  () => {
    console.log(fcanvas);
    fcanvas.renderAll.bind(fcanvas);
    if (
      fcanvas.width > fcanvas.height &&
      !document.querySelector('.canvas-container .divider')
    ) {
      const ele = document.createElement('div');
      ele.setAttribute('class', 'divider');
      document.querySelector('.canvas-container').appendChild(ele);
    }
  }
);
