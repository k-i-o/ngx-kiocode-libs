export class Color {
    r: number;
    g: number;
    b: number;
    a: number;
  
    constructor(r: number, g: number, b: number, a: number = 255) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
  }
  
  export const HSLToRGB = (
    hue: number | undefined,
    saturation: number,
    lightness: number
  ): number[] => {
    if (hue === undefined) {
      return [0, 0, 0];
    }
  
    let chroma = (1 - Math.abs((2 * lightness) / 100 - 1)) * (saturation / 100);
    let huePrime = hue / 60;
    let secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));
    let red: number = 0,
      green: number = 0,
      blue: number = 0;
  
    huePrime = Math.floor(huePrime);
  
    if (huePrime === 0) {
      red = chroma;
      green = secondComponent;
      blue = 0;
    } else if (huePrime === 1) {
      red = secondComponent;
      green = chroma;
      blue = 0;
    } else if (huePrime === 2) {
      red = 0;
      green = chroma;
      blue = secondComponent;
    } else if (huePrime === 3) {
      red = 0;
      green = secondComponent;
      blue = chroma;
    } else if (huePrime === 4) {
      red = secondComponent;
      green = 0;
      blue = chroma;
    } else if (huePrime === 5) {
      red = chroma;
      green = 0;
      blue = secondComponent;
    }
  
    let lightnessAdjustment = lightness / 100 - chroma / 2;
    red = Math.round((red + lightnessAdjustment) * 255);
    green = Math.round((green + lightnessAdjustment) * 255);
    blue = Math.round((blue + lightnessAdjustment) * 255);
  
    return [red, green, blue];
  };
  
  export const RGBToHSL = (
    r: number = 0,
    g: number = 0,
    b: number = 0
  ): number[] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };
  
  export const rgbFormat = (color: string): number[] => {
    let sColorList: string[] = color.split(',');
    const sColor: number[] = sColorList.map(Number);
  
    if (sColor.length < 3 || sColor.length > 4) {
      throw new Error('Minimum and maximum elements: 3, 4');
    }
  
    for (let i = 0; i < sColor.length; i++) {
      let valueCheck = sColorList[i].match(/\d+/);
      if (!valueCheck) {
        throw new Error(
          `Invalid RGB color format ${color}\nValid format: '255, 0, 12' or '255, 0, 12, 255'`
        );
      }
      var value: number = parseInt(valueCheck[0]);
      if (value < 0 || value > 255) {
        throw new Error(`RGB color ${value} is not between 0 and 255`);
      }
      sColor[i] = value;
    }
    return sColor;
  };
  
  export const hslFormat = (color: string): number[] => {
    let sColorList: string[] = color.split(',');
    const sColor: number[] = sColorList.map(Number);
    const limits = [360, 100, 100, 255];
    let limit;
  
    if (sColor.length < 3 || sColor.length > 4) {
      throw new Error('Minimum and maximum elements: 3, 4');
    }
  
    for (let i = 0; i < sColor.length; i++) {
      let valueCheck = sColorList[i].match(/\d+/);
      if (!valueCheck) {
        throw new Error(
          `Invalid HSL color format ${color}\nValid format: '360, 100, 100' or '123, 12, 12, 255'`
        );
      }
      var value: number = parseInt(valueCheck[0]);
      limit = limits[i];
      if (value < 0 || value > limit) {
        throw new Error(`RGB color ${value} is not between 0 and ${limit}`);
      }
      sColor[i] = value;
    }
    return sColor;
  };
  
  export const isDigit = (str: string): boolean => {
    for (const char of str) {
      if (!'1234567890'.includes(char)) {
        return false;
      }
    }
    return true;
  };
  
  export const genChunks = (src: string, size: number): string[] => {
    let ret: string[] = [];
  
    for (let i = 0; i < src.length; i += size) {
      ret.push(src.slice(i, i + size));
    }
    return ret;
  };
  
  // Convert a color code to HSL format
  export const codeFormat = (color: string): number[] => {
    if (!isDigit(color)) {
      throw new Error(
        `Invalid code format ${color}\nValid format: A value encoded on 6 bytes`
      );
    }
  
    if (parseInt(color) < 0 || parseInt(color) > 0xffffff) {
      throw new Error(
        `Invalid value ${color}\nValid format: an integer (min: 0, max: 0xffffff)`
      );
    }
    color = parseInt(color).toString(16);
    const l = color.length;
    if (l < 6) {
      color = '0'.repeat(6 - l) + color;
    }
    var newColor: number[] = genChunks(color, 2).map((x) => parseInt(x, 16));
    if (newColor[0] === 255) {
      newColor[0] = 0;
    }
    newColor[0] = (newColor[0] * 360) / 255;
    newColor[1] = (newColor[1] * 100) / 255;
    newColor[2] = (newColor[2] / 255 / 2 + 0.5) * 100;
    return newColor;
  };
  
  export const COLOR_FORMAT: { [key: string]: (color: string) => number[] } = {
    rgb: rgbFormat,
    hsl: hslFormat,
    code: codeFormat,
  };
  
  export const blackAndWhite = (pixel: Color): void => {
    const newValue = (pixel.r + pixel.g + pixel.b) / 3;
    pixel.r = newValue;
    pixel.g = newValue;
    pixel.b = newValue;
  };
  
  export const defaultOp = (pixel: Color, color: Color): void => {
    pixel.r = (pixel.r * color.r) / 255;
    pixel.g = (pixel.g * color.g) / 255;
    pixel.b = (pixel.b * color.b) / 255;
    pixel.a = (pixel.a * color.a) / 255;
  };
  
  export const COLOR_MODE: {
    [key: string]: (pixel: Color, color: Color) => void;
  } = {
    default: defaultOp,
    grayscale: blackAndWhite,
  };
  