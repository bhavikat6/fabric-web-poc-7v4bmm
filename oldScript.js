const configStore = (function () {
  // general default stuff that will help us set some options
  const spacingUnit = 20; // this is the old textPadding

  const defaultFont = 'fontid-107'; // Annette Print ("Hey sunshine")
  const piBy2 = Math.PI / 2;
  const piBy180 = Math.PI / 180;
  const originXOffset = {
      left: -0.5,
      center: 0,
      right: 0.5,
    },
    originYOffset = {
      top: -0.5,
      center: 0,
      bottom: 0.5,
    };
  const bleedInMM = 3,
    mmInPixels = 11.811,
    scalingFactor = 1;

  return {
    spacingUnit: spacingUnit,
    defaultUserPhotozoneImageWidth: 200,
    multiplierWidth: 0.2269647696476965,
    multiplierHeight: 0.22705771050141912,
    // the defaults are used on front and back of the cards
    textDefaultSettings: {
      name: 'userText',
      fontFamily: defaultFont,
      // positioning and dimensions
      textAlign: 'left',
      left: spacingUnit * 4,
      top: spacingUnit * 4,
      padding: 0.75 * spacingUnit,
      // miscellaneous settingsuser
      editable: false,
      selectable: true,
      fill: '#74717E',
      cursorColor: '#74717E',
    },
    // defaults for editable texts
    editableTextDefaultSettings: {
      name: 'editableText',
      backgroundColor: 'rgba(237, 141, 56, 0.2)',
      editableText: true,
      editable: false,
      isModified: false,
      lockMovementX: true,
      lockMovementY: true,
      hoverCursor: 'pointer',
      padding: 5,
      selectable: true,
      selectionColor: 'rgba(237, 141, 56, 0.2)',
    },
    // defaults for editable areas
    editableAreaDefaultSettings: {
      name: 'editableArea',
      stroke: '#ED8D38',
      strokeWidth: 4,
      strokeDashArray: [12, 18],
      strokeLineCap: 'round',
      fill: 'rgba(237, 141, 56, 0.2)',
      isModified: false,
      selectable: false,
      eventable: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      hoverCursor: 'default',
    },
    // editable area action buttons background & shape
    editableAreaButtonBackground: {
      radius: 65,
      fill: '#562B9D',
      originX: 'top',
      originY: 'left',
      selectable: false,
      eventable: false,
    },
    // editable area button with icon group settings
    editableAreaButtonGroupDefault: {
      name: 'areaButton',
      selectable: false,
      eventable: true,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
    },
    // editable area button group text (action button text)
    editableAreaButtonTextDefault: {
      name: 'areaText',
      textAlign: 'center',
      fontSize: 28,
      fontFamily: 'Poppins',
      fill: '#562B9D',
      opacity: 0.6,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false,
      eventable: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'default',
    },
    // editable area explanation text settings
    editableAreaExplanationDefault: {
      name: 'areaInfo',
      textAlign: 'center',
      fontSize: 32,
      fontFamily: 'Poppins',
      fill: '#562B9D',
      selectable: false,
      eventable: false,
      originX: 'center',
      originY: 'top',
      hoverCursor: 'default',
    },
    // the defaults for the placeholders
    placeholderDefaultSettings: {
      name: 'placeholder',
      fontFamily: defaultFont,
      // positioning and dimensions
      left: spacingUnit * 4,
      padding: 0.75 * spacingUnit,
      // miscellaneous settings
      editable: true,
      fill: '#74717E',
      opacity: 1,
    },
    // default scaling for images and decorations
    defaultImageScale: 1 / 4,
    defaultDecorationScale: 1 / 6,
    rectFillColor: '#838684',
    imageDefaultSettings: {
      originX: 'center',
      originY: 'center',
      crossOrigin: 'anonymous',
    },
    // the defaults for photozone placement
    photozoneDefaultSettings: {
      name: 'photozone',
      originX: 'left',
      originY: 'top',
      fill: 'transparent',
      hoverCursor: 'pointer',
      strokeWidth: 0,
      selectable: false,
      evented: true,
      lockMovementX: true,
      lockMovementY: true,
      hasImg: false,
    },
    // the defaults for images added on photozones
    imagePhotozoneDefaultSettings: {
      name: 'userUploadedImage',
      userUploaded: true,
      selectable: false,
      evented: false,
      lockScalingFlip: true,
      angle: 0,
    },
    // the defaults for the overlay images used on photocards (the photoframe)
    overlayImageDefaultSettings: {
      name: 'overlayImg',
      evented: false,
      selectable: false,
    },
    cos: function (angle) {
      if (angle === 0) {
        return 1;
      }
      if (angle < 0) {
        // cos(a) = cos(-a)
        angle = -angle;
      }
      var angleSlice = angle / piBy2;
      switch (angleSlice) {
        case 1:
        case 3:
          return 0;
        case 2:
          return -1;
      }
      return Math.cos(angle);
    },
    /**
     * Calculate the sin of an angle, avoiding returning floats for known results
     * @static
     * @memberOf fabric.util
     * @param {Number} angle the angle in radians or in degree
     * @return {Number}
     */
    sin: function (angle) {
      if (angle === 0) {
        return 0;
      }
      var angleSlice = angle / piBy2,
        sign = 1;
      if (angle < 0) {
        // sin(-a) = -sin(a)
        sign = -1;
      }
      switch (angleSlice) {
        case 1:
          return sign;
        case 2:
          return 0;
        case 3:
          return -sign;
      }
      return Math.sin(angle);
    },
    radToDegree: function (rad) {
      return (rad || 0) / piBy180;
    },
    degreesToRadians: function (deg) {
      return (deg || 0) * piBy180;
    },
    getNonTransformedDimensions: function (obj) {
      var strokeWidth = obj.strokeWidth,
        w = obj.width + strokeWidth,
        h = obj.height + strokeWidth;
      return { x: w, y: h };
    },
    finalizeDimensions: function (obj, width, height) {
      return obj.strokeUniform
        ? { x: width + obj.strokeWidth, y: height + obj.strokeWidth }
        : { x: width, y: height };
    },
    multiplyTransformMatrices: function (a, b, is2x2) {
      // Matrix multiply a * b
      return [
        a[0] * b[0] + a[2] * b[1],
        a[1] * b[0] + a[3] * b[1],
        a[0] * b[2] + a[2] * b[3],
        a[1] * b[2] + a[3] * b[3],
        is2x2 ? 0 : a[0] * b[4] + a[2] * b[5] + a[4],
        is2x2 ? 0 : a[1] * b[4] + a[3] * b[5] + a[5],
      ];
    },
    calcDimensionsMatrix: function (options) {
      var scaleX = typeof options.scaleX === 'undefined' ? 1 : options.scaleX,
        scaleY = typeof options.scaleY === 'undefined' ? 1 : options.scaleY,
        scaleMatrix = [
          options.flipX ? -scaleX : scaleX,
          0,
          0,
          options.flipY ? -scaleY : scaleY,
          0,
          0,
        ],
        multiply = this.multiplyTransformMatrices,
        degreesToRadians = this.degreesToRadians;
      if (options.skewX) {
        scaleMatrix = multiply(
          scaleMatrix,
          [1, 0, Math.tan(degreesToRadians(options.skewX)), 1],
          true
        );
      }
      if (options.skewY) {
        scaleMatrix = multiply(
          scaleMatrix,
          [1, Math.tan(degreesToRadians(options.skewY)), 0, 1],
          true
        );
      }
      return scaleMatrix;
    },
    transformPoint: function (p, t, ignoreOffset) {
      if (ignoreOffset) {
        return { x: t[0] * p.x + t[2] * p.y, y: t[1] * p.x + t[3] * p.y };
      }
      return {
        x: t[0] * p.x + t[2] * p.y + t[4],
        y: t[1] * p.x + t[3] * p.y + t[5],
      };
    },
    arrayFind: function (array, byProperty, condition) {
      if (!array || array.length === 0) {
        return;
      }
      var i = array.length - 1,
        result = byProperty ? array[i][byProperty] : array[i];
      if (byProperty) {
        while (i--) {
          if (condition(array[i][byProperty], result)) {
            result = array[i][byProperty];
          }
        }
      } else {
        while (i--) {
          if (condition(array[i], result)) {
            result = array[i];
          }
        }
      }
      return result;
    },
    arrayMax: function (array, byProperty) {
      return this.arrayFind(array, byProperty, function (value1, value2) {
        return value1 >= value2;
      });
    },
    arrayMin: function (array, byProperty) {
      return this.arrayFind(array, byProperty, function (value1, value2) {
        return value1 < value2;
      });
    },
    makeBoundingBoxFromPoints: function (points, transform) {
      if (transform) {
        for (var i = 0; i < points.length; i++) {
          points[i] = this.transformPoint(points[i], transform);
        }
      }
      var xPoints = [points[0].x, points[1].x, points[2].x, points[3].x],
        minX = this.arrayMin(xPoints),
        maxX = this.arrayMax(xPoints),
        width = maxX - minX,
        yPoints = [points[0].y, points[1].y, points[2].y, points[3].y],
        minY = this.arrayMin(yPoints),
        maxY = this.arrayMax(yPoints),
        height = maxY - minY;
      return {
        left: minX,
        top: minY,
        width: width,
        height: height,
      };
    },
    sizeAfterTransform: function (width, height, options) {
      var dimX = width / 2,
        dimY = height / 2,
        points = [
          {
            x: -dimX,
            y: -dimY,
          },
          {
            x: dimX,
            y: -dimY,
          },
          {
            x: -dimX,
            y: dimY,
          },
          {
            x: dimX,
            y: dimY,
          },
        ],
        transformMatrix = this.calcDimensionsMatrix(options),
        bbox = this.makeBoundingBoxFromPoints(points, transformMatrix);
      return {
        x: bbox.width,
        y: bbox.height,
      };
    },
    getTransformedDimensions: function (obj, skewX, skewY) {
      if (typeof skewX === 'undefined') {
        skewX = obj.skewX;
      }
      if (typeof skewY === 'undefined') {
        skewY = obj.skewY;
      }
      var dimensions,
        dimX,
        dimY,
        noSkew = skewX === 0 && skewY === 0;
      if (obj.strokeUniform) {
        dimX = obj.width;
        dimY = obj.height;
      } else {
        dimensions = this.getNonTransformedDimensions(obj);
        dimX = dimensions.x;
        dimY = dimensions.y;
      }
      if (noSkew) {
        return this.finalizeDimensions(
          obj,
          dimX * obj.scaleX,
          dimY * obj.scaleY
        );
      }
      var bbox = this.sizeAfterTransform(dimX, dimY, {
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
        skewX: skewX,
        skewY: skewY,
      });
      return this.finalizeDimensions(obj, bbox.x, bbox.y);
    },
    translateToGivenOrigin: function (
      point,
      fromOriginX,
      fromOriginY,
      toOriginX,
      toOriginY,
      obj
    ) {
      var x = point.x,
        y = point.y,
        offsetX,
        offsetY,
        dim;
      if (typeof fromOriginX === 'string') {
        fromOriginX = originXOffset[fromOriginX];
      } else {
        fromOriginX -= 0.5;
      }
      if (typeof toOriginX === 'string') {
        toOriginX = originXOffset[toOriginX];
      } else {
        toOriginX -= 0.5;
      }
      offsetX = toOriginX - fromOriginX;
      if (typeof fromOriginY === 'string') {
        fromOriginY = originYOffset[fromOriginY];
      } else {
        fromOriginY -= 0.5;
      }
      if (typeof toOriginY === 'string') {
        toOriginY = originYOffset[toOriginY];
      } else {
        toOriginY -= 0.5;
      }
      offsetY = toOriginY - fromOriginY;
      if (offsetX || offsetY) {
        dim = this.getTransformedDimensions(obj);
        x = point.x + offsetX * dim.x;
        y = point.y + offsetY * dim.y;
      }
      return { x, y };
    },
    rotateVector: function (vector, radians) {
      var sin = this.sin(radians),
        cos = this.cos(radians),
        rx = vector.x * cos - vector.y * sin,
        ry = vector.x * sin + vector.y * cos;
      return {
        x: rx,
        y: ry,
      };
    },
    rotatePoint: function (point, origin, radians) {
      var newPoint = { x: point.x - origin.x, y: point.y - origin.y },
        v = this.rotateVector(newPoint, radians);
      return { x: v.x + origin.x, y: v.y + origin.y };
    },
    translateToCenterPoint: function (point, originX, originY, obj) {
      var p = this.translateToGivenOrigin(
        point,
        originX,
        originY,
        'center',
        'center',
        obj
      );
      if (obj.angle) {
        return this.rotatePoint(p, point, this.degreesToRadians(obj.angle));
      }
      return p;
    },
    getCenterPoint: function (obj) {
      var leftTop = { x: obj.left, y: obj.top };
      return this.translateToCenterPoint(
        leftTop,
        obj.originX,
        obj.originY,
        obj
      );
    },
    calcRotateMatrix: function (obj) {
      if (!obj.angle) {
        return [1, 0, 0, 1, 0, 0];
      }
      var theta = this.degreesToRadians(obj.angle),
        cos = this.cos(theta),
        sin = this.sin(theta);
      return [cos, sin, -sin, cos, 0, 0];
    },
    calcTranslateMatrix: function (obj) {
      var center = this.getCenterPoint(obj);
      return [1, 0, 0, 1, center.x, center.y];
    },
    calcPointRotationTransform: function (point, angle) {
      if (angle) {
        const t = this.calcRotateMatrix({ angle });
        return this.transformPoint(point, t);
      }
      return point;
    },
    helperSettings: {
      bleedInMM,
      mmInPixels,
      scalingFactor,
    },
    calcACoords: function (obj) {
      var rotateMatrix = this.calcRotateMatrix(obj),
        translateMatrix = this.calcTranslateMatrix(obj),
        finalMatrix = this.multiplyTransformMatrices(
          translateMatrix,
          rotateMatrix
        ),
        dim = this.getTransformedDimensions(obj),
        w = dim.x / 2,
        h = dim.y / 2;
      return {
        // corners
        tl: this.transformPoint({ x: -w, y: -h }, finalMatrix),
        tr: this.transformPoint({ x: w, y: -h }, finalMatrix),
        bl: this.transformPoint({ x: -w, y: h }, finalMatrix),
        br: this.transformPoint({ x: w, y: h }, finalMatrix),
      };
    },
    getBoundingRect: function (obj) {
      const aCoords = this.calcACoords(obj);
      const coords = [aCoords.tl, aCoords.tr, aCoords.br, aCoords.bl];
      return this.makeBoundingBoxFromPoints(coords);
    },
  };
})();

const deepCopy = (inObject) => {
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject;
  }

  const outObject = Array.isArray(inObject) ? [] : {};

  Object.keys(inObject).forEach((key) => {
    const val = inObject[`${key}`];
    outObject[`${key}`] = deepCopy(val);
  });

  return outObject;
};

const printJsonConversion = (canvasJson) => {
  const printJSON = deepCopy(canvasJson);
  const scalingFactor = configStore.helperSettings.scalingFactor;
  const bleedInPixels =
    (configStore.helperSettings.bleedInMM *
      configStore.helperSettings.mmInPixels) /
    configStore.helperSettings.scalingFactor;
  if (printJSON.backgroundImage) {
    printJSON.backgroundImage.width *=
      scalingFactor * printJSON.backgroundImage.scaleX;
    printJSON.backgroundImage.height *=
      scalingFactor * printJSON.backgroundImage.scaleY;

    printJSON.backgroundImage.left = 0;
    printJSON.backgroundImage.top = 0;
    const imgSrc = printJSON.backgroundImage.src.split('?w=')[0];
    printJSON.backgroundImage.src = `${imgSrc}?w=${printJSON.backgroundImage.width}`;
  }
  printJSON.objects = printJSON.objects.map((canvasObject) => {
    if (canvasObject.type === 'textbox') {
      canvasObject.fontSize *= scalingFactor;
      canvasObject.width *= scalingFactor;
      canvasObject.height *= scalingFactor;
    } else {
      canvasObject.scaleX *= scalingFactor;
      canvasObject.scaleY *= scalingFactor;

      if (canvasObject.src) {
        canvasObject.src = canvasObject.src.split('?w=')[0];
      }
    }

    if (canvasObject.clipPath) {
      canvasObject.clipPath.scaleX *= scalingFactor;
      canvasObject.clipPath.scaleY *= scalingFactor;
      canvasObject.clipPath.left =
        (canvasObject.clipPath.left + bleedInPixels) * scalingFactor;
      canvasObject.clipPath.top =
        (canvasObject.clipPath.top + bleedInPixels) * scalingFactor;
    }

    canvasObject.left = (canvasObject.left + bleedInPixels) * scalingFactor;
    canvasObject.top = (canvasObject.top + bleedInPixels) * scalingFactor;
    return canvasObject;
  });
  return printJSON;
};

const loadLayer = async (layer, faceNumber, preview) => {
  let { backgroundUrl, frameUrl } = layer;

  let canvasJson = {
    version: '3.6.6',
    objects: [],
    selectionColor: 'rgba(100, 100, 255, 0.3)',
    hoverCursor: 'move',
  };

  if (backgroundUrl) {
    canvasJson.backgroundImage = {
      type: 'image',
      version: '3.6.6',
      originX: 'left',
      originY: 'top',
      left: 0,
      top: 0,
      width: layer.dimensions.width,
      height: layer.dimensions.height,
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
      lockScalingFlip: false,
      selectable: true,
      lockMovementX: false,
      lockMovementY: false,
      cornerColor: 'rgb(178,204,255)',
      borderDashArray: null,
      evented: true,
      hoverCursor: null,
      lockRotation: false,
      src: backgroundUrl,
      crossOrigin: 'anonymous',
      filters: [],
    };
  }

  const userImages = [];
  await Promise.all(
    layer.photoZones.map((d) => {
      if (typeof d.deleted === 'undefined' || d.deleted === false) {
        if (typeof d.userDefined === 'undefined' || d.userDefined === false) {
          canvasJson.objects.push(
            Object.assign({}, configStore.photozoneDefaultSettings, {
              type: 'rect',
              version: '3.6.6',
              left: (d.left || 0) + 17.7165,
              top: (d.top || 0) + 17.7165,
              width: (d.width || layer.dimensions.width) + 17.7165,
              height: (d.height || layer.dimensions.height) + 17.7165,
              angle: configStore.radToDegree(d.angle),
              fill: configStore.rectFillColor,
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: 'butt',
              strokeDashOffset: 0,
              strokeLineJoin: 'miter',
              strokeUniform: false,
              strokeMiterLimit: 4,
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
              rx: 0,
              ry: 0,
              inverted: false,
            })
          );
        }
        if (d.image && d.image.uri) {
          d.image.imageId && userImages.push(d.image.imageId);
          let scaleX = 1,
            scaleY = 1,
            iScaleX = d.image.scaleX || 1,
            iScaleY = d.image.scaleY || 1,
            left = d.left || 0,
            top = d.top || 0,
            cropRectWidth =
              d.image && d.image.cropRect && d.image.cropRect.width
                ? d.image.cropRect.width
                : undefined,
            cropReactHeight =
              d.image && d.image.cropRect && d.image.cropRect.height
                ? d.image.cropRect.height
                : undefined,
            imageWidth = cropRectWidth || d.image.width || 0,
            imageHeight = cropReactHeight || d.image.height || 0;
          if (typeof d.userDefined === 'undefined') {
            const canvasWidth = d.width || layer.dimensions.width || 0,
              canvasHeight = d.height || layer.dimensions.height || 0,
              isCustomWidthDefined = d.width ? true : false,
              isCustomHeightDefined = d.height ? true : false;

            if (imageWidth * scaleX > imageHeight * scaleY) {
              scaleX = scaleY = canvasHeight / (imageHeight * scaleY);
            }
            if (imageWidth * scaleX < imageHeight * scaleY) {
              scaleX = scaleY = canvasWidth / (imageWidth * scaleX);
            }
            if (imageWidth * scaleX < canvasWidth) {
              scaleX = scaleY = canvasWidth / (imageWidth * scaleX);
            }
            if (imageHeight * scaleY < canvasHeight) {
              scaleX = scaleY = canvasHeight / (imageHeight * scaleY);
            }

            scaleX = scaleX * iScaleX;
            scaleY = scaleY * iScaleY;
            if (isCustomWidthDefined && isCustomHeightDefined) {
              if (imageWidth * scaleX > canvasWidth) {
                left = left - (imageWidth * scaleX - canvasWidth) / 2;
                top = top - (imageHeight * scaleY - canvasHeight) / 2;
              } else {
                top = top - (imageHeight * scaleY - canvasHeight) / 2;
                left = left - (imageWidth * scaleX - canvasWidth) / 2;
              }
            } else {
              left = (canvasWidth - imageWidth * scaleX) / 2;
              top = (canvasHeight - imageHeight * scaleY) / 2;
            }
            left +=
              (d.image.left || 0) +
              17.7165 +
              (d.image.translateX || 0) / 2 / configStore.multiplierWidth;
            top +=
              (d.image.top || 0) +
              17.7165 +
              (d.image.translateY || 0) / 2 / configStore.multiplierHeight;
          } else if (d.userDefined) {
            const canvasWidth = layer.dimensions.width || 0,
              canvasHeight = layer.dimensions.height || 0;
            scaleX = scaleY =
              (configStore.defaultUserPhotozoneImageWidth / imageWidth) *
              (1 / configStore.multiplierWidth);
            left =
              (d.image.insideWidth || 0) +
              (canvasWidth / 2 - imageWidth * scaleX) / 2;
            top = (canvasHeight - imageHeight * scaleY) / 2;
            scaleX = scaleX * iScaleX;
            scaleY = scaleY * iScaleY;
            left =
              (d.image.insideWidth || 0) +
              (canvasWidth / 2 - imageWidth * scaleX) / 2;
            top = (canvasHeight - imageHeight * scaleY) / 2;
            left = left + (d.image.left || 0) / configStore.multiplierWidth;
            top = top + (d.image.top || 0) / configStore.multiplierHeight;
          }

          let point = {
            x: left,
            y: top,
          };

          const fImageObj = {
            type: 'image',
            version: '3.6.6',
            left: point.x,
            top: point.y,
            scaleX: scaleX || 1,
            scaleY: scaleY || 1,
            userAddedPhotoId: d.image.imageId,
            angle: configStore.radToDegree(d.image.angle),
            originX: 'left',
            originY: 'top',
            centeredRotation: true,
            centeredScaling: true,
            width: imageWidth + (d.userDefined ? 0 : 17.7165),
            height: imageHeight + (d.userDefined ? 0 : 17.7165),
            fill: 'rgb(0,0,0)',
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: 'butt',
            strokeDashOffset: 0,
            strokeLineJoin: 'miter',
            strokeUniform: false,
            strokeMiterLimit: 4,
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
            name: 'userUploadedImage',
            userUploaded: true,
            src: d.image.uri,
            crossOrigin: 'anonymous',
            filters: [],
            shadow:
              typeof d.userDefined === 'boolean'
                ? {
                    color: 'rgba(0, 0, 0, 0.25)',
                    blur: 50,
                    offsetX: 0,
                    offsetY: 15 / configStore.multiplierHeight,
                  }
                : null,
            clipPath:
              typeof d.userDefined === 'undefined'
                ? {
                    type: 'rect',
                    version: '3.6.6',
                    left: (d.left || 0) + (d.userDefined ? 0 : 17.7165),
                    top: (d.top || 0) + (d.userDefined ? 0 : 17.7165),
                    width:
                      (d.width || layer.dimensions.width) +
                      (d.userDefined ? 0 : 17.7165),
                    height:
                      (d.height || layer.dimensions.height) +
                      (d.userDefined ? 0 : 17.7165),
                    angle: configStore.radToDegree(d.angle),
                    fill: 'rgb(0,0,0)',
                    stroke: null,
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: 'butt',
                    strokeDashOffset: 0,
                    strokeLineJoin: 'miter',
                    strokeUniform: false,
                    strokeMiterLimit: 4,
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
                    rx: 0,
                    ry: 0,
                    inverted: false,
                    absolutePositioned: true,
                  }
                : undefined,
          };

          if (d.image.angle) {
            const centerPoint = {
              x:
                point.x +
                ((imageWidth + (d.userDefined ? 0 : 17.7165)) * scaleX) / 2,
              y:
                point.y +
                ((imageHeight + (d.userDefined ? 0 : 17.7165)) * scaleY) / 2,
            };
            const rotatePoint = configStore.rotatePoint(
              point,
              centerPoint,
              d.image.angle
            );
            fImageObj.left = rotatePoint.x;
            fImageObj.top = rotatePoint.y;
            console.log(rotatePoint, centerPoint, point);
          }

          canvasJson.objects.push(fImageObj);
        }
      }
    })
  );

  if (frameUrl) {
    canvasJson.objects.push(
      Object.assign({}, configStore.overlayImageDefaultSettings, {
        type: 'image',
        version: '3.6.6',
        left: 0,
        top: 0,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        originX: 'left',
        originY: 'top',
        width: layer.dimensions.width,
        height: layer.dimensions.height,
        fill: 'transparent',
        stroke: null,
        strokeWidth: 0,
        strokeDashArray: null,
        strokeLineCap: 'butt',
        strokeDashOffset: 0,
        strokeLineJoin: 'miter',
        strokeUniform: false,
        strokeMiterLimit: 4,
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
        selectable: false,
        evented: false,
        lockScalingFlip: true,
        src: frameUrl,
        crossOrigin: 'anonymous',
        filters: [],
      })
    );
  }

  layer.texts.forEach((d) => {
    if (typeof d.isDeleted === 'undefined' || d.isDeleted === false) {
      let point = {
        x:
          (d.left || 0) +
          17.7165 +
          (d.translateX || 0) / 2 / configStore.multiplierWidth,
        y:
          (d.top || 0) +
          17.7165 +
          (d.translateY || 0) / 2 / configStore.multiplierWidth,
      };
      const textObj = Object.assign({}, configStore.textDefaultSettings, {
        type: 'textbox',
        version: '3.6.6',
        originX: 'left',
        originY: 'top',
        left: point.x,
        top: point.y,
        width: d.width + 17.7165,
        height: d.height + 17.7165,
        fill: d.textColor,
        angle: d.angle,
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
        fontFamily: `fontid-${d.fontId}`,
        fontWeight: 'normal',
        fontSize: d.fontSize * 4,
        text: d.text,
        underline: false,
        overline: false,
        linethrough: false,
        textAlign: d.textAlign,
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
      });
      canvasJson.objects.push(textObj);
    }
  });

  return {
    CanvasJson: canvasJson,
    PrintJson: printJsonConversion(canvasJson),
    UserImages: userImages,
    FaceId: faceNumber,
    FaceNumber: faceNumber,
  };
};

const jsonData = {
  project_id: 'd838d126-20e2-451a-963e-4ca2c92b00ce',
  account_id: '2125483729',
  name: 'test',
  product_id: '2PGM1207',
  scan_code: '0002390336',
  version: 1,
  is_digital_fulfillment: false,
  expiration_date: '2023-03-31T13:40:39.480107952Z',
  project_type_code: 'P',
  project_status_code: 'C',
  created_at: '2023-03-24T13:40:39.480136355Z',
  last_updated_at: '2023-03-24T13:40:39.480137712Z',
  font_collection: {
    default_size: 55,
    default_color: '#000000',
    fonts: [
      {
        id: 101,
        name: 'Simply Yours',
        url: 'https://content.dev.hallmark.com/POD_Fonts/108317.ttf',
      },
      {
        id: 102,
        name: 'Grateful for You',
        url: 'https://content.dev.hallmark.com/POD_Fonts/126056.ttf',
      },
      {
        id: 103,
        name: 'Warmest Wishes',
        url: 'https://content.dev.hallmark.com/POD_Fonts/BerdingScript.ttf',
      },
      {
        id: 104,
        name: 'Yours Always',
        url: 'https://content.dev.hallmark.com/POD_Fonts/TuesdayHMK-MGE.ttf',
      },
      {
        id: 105,
        name: 'All My Best',
        url: 'https://content.dev.hallmark.com/POD_Fonts/KrickHMK-Regular.ttf',
      },
      {
        id: 106,
        name: 'Take It Easy',
        url: 'https://content.dev.hallmark.com/POD_Fonts/JohnsonBallpointPen.ttf',
      },
      {
        id: 107,
        name: 'Hey Sunshine',
        url: 'https://content.dev.hallmark.com/POD_Fonts/AnnettePrintMGE-Regular.ttf',
      },
      {
        id: 108,
        name: 'Stay Strong',
        url: 'https://content.dev.hallmark.com/POD_Fonts/JasonPrint.ttf',
      },
      {
        id: 109,
        name: "'Til Next Time",
        url: 'https://content.dev.hallmark.com/POD_Fonts/126059.ttf',
      },
      {
        id: 110,
        name: 'Catch You Later',
        url: 'https://content.dev.hallmark.com/POD_Fonts/JohnsonPrint.ttf',
      },
      {
        id: 111,
        name: 'Keep in Touch',
        url: 'https://content.dev.hallmark.com/POD_Fonts/JenniferPrintLight.ttf',
      },
      {
        id: 112,
        name: 'Hugs to You',
        url: 'https://content.dev.hallmark.com/POD_Fonts/BrentPrint.ttf',
      },
      {
        id: 113,
        name: 'Kind Regards',
        url: 'https://content.dev.hallmark.com/POD_Fonts/TypewriteWornOneHMK.ttf',
      },
      {
        id: 114,
        name: 'Buh-Bye',
        url: 'https://content.dev.hallmark.com/POD_Fonts/AmbergerSansTextA.ttf',
      },
      {
        id: 115,
        name: 'Cheers to You',
        url: 'https://content.dev.hallmark.com/POD_Fonts/BeamNewHMK-Regular.ttf',
      },
      {
        id: 116,
        name: 'Later Gator',
        url: 'https://content.dev.hallmark.com/POD_Fonts/CrayottBookKB.ttf',
      },
      {
        id: 117,
        name: 'WHAT’S UP',
        url: 'https://content.dev.hallmark.com/POD_Fonts/AlmondMilkHMK-Regular.ttf',
      },
      {
        id: 119,
        name: 'Just Saying',
        url: 'https://content.dev.hallmark.com/POD_Fonts/SarahndipityHMK-Smooth.ttf',
      },
      {
        id: 120,
        name: 'OMG Hi',
        url: 'https://content.dev.hallmark.com/POD_Fonts/BeamNewHMK-Bold.ttf',
      },
      {
        id: 121,
        name: "How Ya Doin'",
        url: 'https://content.dev.hallmark.com/POD_Fonts/HelloOne-HMK.ttf',
      },
      {
        id: 122,
        name: 'Just a Note',
        url: 'https://content.dev.hallmark.com/POD_Fonts/AstaSlabHMK-Medium.ttf',
      },
      {
        id: 123,
        name: 'Keep Smiling',
        url: 'https://content.dev.hallmark.com/POD_Fonts/MiziletteHMK-SemiBoldUpright.ttf',
      },
      {
        id: 124,
        name: 'Sincerely',
        url: 'https://content.dev.hallmark.com/POD_Fonts/QueensHatHMK-Italic.ttf',
      },
      {
        id: 125,
        name: 'Hiya Pal',
        url: 'https://content.dev.hallmark.com/POD_Fonts/MichaelaVFHMK.ttf',
      },
      {
        id: 126,
        name: 'Be Seeing You',
        url: 'https://content.dev.hallmark.com/POD_Fonts/FieldnotesHMK-Rough.ttf',
      },
      {
        id: 127,
        name: 'Good Vibes',
        url: 'https://content.dev.hallmark.com/POD_Fonts/GretaHMK-Regular.ttf',
      },
      {
        id: 128,
        name: 'Best Wishes',
        url: 'https://content.dev.hallmark.com/POD_Fonts/BernhardFashionOnePKA.ttf',
      },
      {
        id: 129,
        name: 'Hang Loose',
        url: 'https://content.dev.hallmark.com/POD_Fonts/RittenPrintLowRiseHMK-Regular.ttf',
      },
      {
        id: 130,
        name: 'Much Appreciated',
        url: 'https://content.dev.hallmark.com/POD_Fonts/BethelHMK-Regular.ttf',
      },
    ],
  },
  product: {
    product_id: '2PGM1207',
    template_id: 'PGM1207',
    product_name: 'Personalized Full Photo Birthday Photo Card, 5x7 Vertical',
    vendor_lead_time: 1,
    envelope_color: '#FFFFF',
  },
  fulfillment: {},
  variables: {
    template_data: {
      cardFormat: 'portrait',
      cardSize: '49',
      cardType: 'photo',
      dimensions: {
        height: 179,
        width: 125,
      },
      faces: [
        {
          backgroundUrl:
            'https://content.dev.hallmark.com/webassets/PGM1207/PGM1207_P1_Background.png',
          canvasJson: null,
          dimensions: {
            height: 2114,
            width: 1476,
          },
          editableAreas: [],
          faceId: 1,
          frameUrl:
            'https://content.dev.hallmark.com/webassets/PGM1207/PGM1207_P1_Frame.png',
          isEditable: true,
          overlayBackgroundUrl: '',
          photoZones: [
            {
              height: 1951.7098,
              left: 21.259802,
              angle: 0,
              top: 45.70975,
              width: 1363.6118,
              image: {
                playableDuration: null,
                height: 4032,
                width: 3024,
                filename: 'IMG_4072.JPG',
                extension: 'jpg',
                fileSize: 1744579,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/38c7d840-8f56-40e3-a70b-01f7fead1c398466342204829421918.JPG',
                type: 'image',
                localUrl: 'ph://CE01E3CA-F0E8-4B89-BA86-20DD4168590A/L0/001',
                imageId: '3732c7ea-ce72-4eb0-be84-fc186a307ae7',
                photoTrayId: '6a835ed6-0749-4e9e-97c6-a280eadf61ca',
                sliderIndex: 0,
                scaleX: 1.533541341653666,
                scaleY: 1.533541341653666,
                scale: 0.7134649970499101,
                angle: 0,
              },
            },
          ],
          previewUrl:
            'https://content.dev.hallmark.com/webassets/PGM1207/PGM1207_P1_Preview.png',
          replaceBackgroundUrl: '',
          texts: [
            {
              fontFamily: 'OMG Hi',
              fontId: 120,
              fontSize: 26,
              height: 184.72404,
              isFixed: true,
              isHybrid: false,
              isMultiline: false,
              left: 170.5662,
              angle: 0,
              text: 'RYLEIGH',
              textAlign: 'center',
              textColor: '#FFFFFF',
              top: 1693.4612,
              width: 1063.9987,
            },
          ],
          type: 'front',
          userImages: null,
          userTextZones: [],
        },
        {
          backgroundUrl:
            'https://content.dev.hallmark.com/webassets/PGM1207/PGM1207_P2-3_Background.png',
          canvasJson: null,
          dimensions: {
            height: 2114,
            width: 2870,
          },
          editableAreas: [],
          faceId: 2,
          frameUrl: '',
          isEditable: true,
          overlayBackgroundUrl: '',
          photoZones: [
            {
              left: 67.5,
              top: 106.66666666666666,
              image: {
                playableDuration: null,
                height: 4032,
                width: 3024,
                filename: 'IMG_4223.HEIC',
                extension: 'heic',
                fileSize: 891586,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/adec519b-14c1-4ff7-aaa8-0ce6c64bcaf75061698421704624730.JPEG',
                type: 'image',
                localUrl: 'ph://73A40F90-CA77-4210-A38E-43DF6358DA97/L0/001',
                imageId: 'b6d799ce-4c84-4a1b-a8ae-cba6cf725e87',
                photoTrayId: 'b1412bff-6fe0-4a42-ad91-bbad348f0831',
                sliderIndex: 1,
                scaleX: 1.452418096723869,
                scaleY: 1.452418096723869,
                left: -18.750000000000142,
                top: 31.000000000000057,
                angle: 1.5707963267948966,
              },
              userDefined: true,
              deleted: true,
            },
            {
              left: 67.5,
              top: 106.66666666666666,
              image: {
                playableDuration: null,
                height: 4032,
                width: 3024,
                filename: 'IMG_4209.HEIC',
                extension: 'heic',
                fileSize: 441296,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/1c318406-9c55-4d1e-83d8-4c0621281ddf3988704659030331921.JPEG',
                type: 'image',
                localUrl: 'ph://284EE1D7-CD3D-4888-8EB0-265257B87813/L0/001',
                imageId: '199031f6-dfc5-4608-9a37-21689d20b171',
                photoTrayId: 'ce9c69fc-5924-4cb6-afe7-19da690d278e',
                sliderIndex: 1,
                scaleX: 0.641185647425897,
                scaleY: 0.641185647425897,
                left: -24,
                top: -79,
                angle: -0.6283185307179586,
              },
              userDefined: true,
              deleted: true,
            },
            {
              left: 67.5,
              top: 106.66666666666666,
              image: {
                playableDuration: null,
                height: 4032,
                width: 3024,
                filename: 'IMG_4234.HEIC',
                extension: 'heic',
                fileSize: 2312788,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/22e4ff25-5482-46fa-98de-25b8937fb3b61461907133103237534.JPEG',
                type: 'image',
                localUrl: 'ph://06FD1567-7539-4BF8-8FD9-C5D3B79E1813/L0/001',
                imageId: 'd78ad6c2-b472-4b18-ab4b-3826d6af3848',
                photoTrayId: 'f1263d12-07af-4c39-9839-6e3edf344c21',
                sliderIndex: 1,
                scaleX: 0.53198127925117,
                scaleY: 0.53198127925117,
                left: 4.499999999999972,
                top: -68.00000000000011,
                angle: -1.0122909661567112,
              },
              userDefined: true,
              deleted: true,
            },
            {
              left: 67.5,
              top: 165,
              image: {
                playableDuration: null,
                height: 2316,
                width: 3088,
                filename: 'IMG_4220.HEIC',
                extension: 'heic',
                fileSize: 1217427,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/74c38317-1674-4022-a5ac-ceea299707782221029477208656602.JPEG',
                type: 'image',
                localUrl: 'ph://1AA3E876-7850-4DBC-B117-6C46F11A1090/L0/001',
                imageId: 'd1ef94e8-bc2d-4553-9efa-1adbb7b71e2c',
                photoTrayId: '03c2aeeb-d4a9-498a-b9e0-673bff032eb9',
                sliderIndex: 1,
                scaleX: 1.28393135725429,
                scaleY: 1.28393135725429,
                angle: 0,
              },
              userDefined: true,
              deleted: true,
            },
            {
              left: 67.5,
              top: 106.66666666666666,
              image: {
                playableDuration: null,
                height: 4032,
                width: 3024,
                filename: 'IMG_4199.HEIC',
                extension: 'heic',
                fileSize: 1230569,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/fae80ecf-ada6-4dce-b6c9-bd6a59aa32252321201417772035573.JPEG',
                type: 'image',
                localUrl: 'ph://8080CB13-C3DB-41EE-BF13-88BEC4752FD4/L0/001',
                imageId: '4d34a67d-b3a9-431c-be2e-ce415194a16e',
                photoTrayId: 'd4151740-2c80-4e77-a1da-b13f21101b70',
                sliderIndex: 1,
                angle: 0.7155849933176751,
                left: -35.500000000000114,
                top: -4,
              },
              userDefined: true,
              deleted: true,
            },
            {
              left: 67.5,
              top: 165,
              image: {
                playableDuration: null,
                height: 2316,
                width: 3088,
                filename: 'IMG_4212.HEIC',
                extension: 'heic',
                fileSize: 1742768,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/796cae37-9c1d-440c-96e7-fb8c2546f69e6782118396114263091.JPEG',
                type: 'image',
                localUrl: 'ph://6C9726C3-965C-4DDD-8556-64E04E79313B/L0/001',
                imageId: 'c40a9a4e-d1a4-4462-ac47-a5bb6ab4a47b',
                photoTrayId: 'fb230b16-e4d7-44fd-ad56-32545162e2ed',
                sliderIndex: 1,
                angle: -0.5410520681182421,
              },
              userDefined: true,
              deleted: true,
            },
            {
              left: 67.5,
              top: 106.66666666666666,
              image: {
                playableDuration: null,
                height: 4032,
                width: 3024,
                filename: 'IMG_4204.HEIC',
                extension: 'heic',
                fileSize: 938926,
                uri: 'https://s3.us-west-2.amazonaws.com/hmklabs-dotcom-dev-us-west-2-consumer-images/images/bbca785b-51fd-41b4-9ae5-2a6763fae21d5780153913936597818.JPEG',
                type: 'image',
                localUrl: 'ph://86FF1CC3-F77F-44B5-BF83-1600BA0DACB9/L0/001',
                imageId: 'e9b36643-e134-47ae-945c-5b6dc8d0b355',
                photoTrayId: 'd0115f54-8069-4afb-ac71-90a7e98ec494',
                sliderIndex: 1,
                scaleX: 0.7004680187207488,
                scaleY: 0.7004680187207488,
                left: 11.500000000000028,
                top: -106.5,
                angle: 0,
              },
              userDefined: true,
            },
          ],
          previewUrl:
            'https://content.dev.hallmark.com/webassets/PGM1207/PGM1207_P2-3_Preview.png',
          replaceBackgroundUrl: '',
          texts: [],
          type: 'inside',
          userImages: null,
          userTextZones: [],
        },
        {
          backgroundUrl:
            'https://content.dev.hallmark.com/webassets/PGM1207/PGM1207_P4_Background.png',
          canvasJson: null,
          dimensions: {
            height: 2114,
            width: 1394,
          },
          editableAreas: [],
          faceId: 3,
          frameUrl: '',
          isEditable: false,
          overlayBackgroundUrl: '',
          photoZones: [],
          previewUrl:
            'https://content.dev.hallmark.com/webassets/PGM1207/PGM1207_P4_Preview.png',
          replaceBackgroundUrl: '',
          texts: [],
          type: 'back',
          userImages: null,
          userTextZones: [],
        },
      ],
      name: 'PGM1207',
      openOrientation: 'right',
      parentDimensions: {
        height: 179,
        width: 125,
      },
    },
  },
};

jsonData.variables.template_data.faces.forEach(async (face, index) => {
  const finalJson = await loadLayer(face, index + 1, false);
  if (index == 0) {
    const fcanvas = new fabric.Canvas(
      document.querySelector('#fCanvas'),
      face.dimensions
    );
    console.log(finalJson);
    fcanvas.loadFromJSON(finalJson.CanvasJson, () => {
      console.log(fcanvas);
      fcanvas.renderAll.bind(fcanvas);
    });
  }
  if (index == 1) {
    const icanvas = new fabric.Canvas(
      document.querySelector('#iCanvas'),
      face.dimensions
    );
    console.log(finalJson);
    icanvas.loadFromJSON(finalJson.CanvasJson, () => {
      console.log(icanvas);
      icanvas.renderAll.bind(icanvas);
    });
  }
});
