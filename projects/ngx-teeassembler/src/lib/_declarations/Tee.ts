import { COLOR_FORMAT, COLOR_MODE, Color, HSLToRGB, RGBToHSL } from './Color';

export class Tee {
  SKIN: any = {
    size: {
      width: 256,
      height: 128,
    },
    elements: {
      body: [0, 0, 96, 96],
      body_shadow: [96, 0, 96, 96],
      hand: [192, 0, 32, 32],
      hand_shadow: [224, 0, 32, 32],
      foot: [192, 32, 64, 32],
      foot_shadow: [192, 64, 64, 32],
      credits: [0, 96, 64, 32],
      default_eye: [64, 96, 32, 32],
      angry_eye: [96, 96, 32, 32],
      blink_eye: [128, 96, 32, 32],
      happy_eye: [160, 96, 32, 32],
      cross_eye: [192, 96, 32, 32],
      surprised_eye: [224, 96, 32, 32],
    },
  };

  genRandomID = (len = 16) => {
    const charSet: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      let randomPos = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPos, randomPos + 1);
    }
    return randomString;
  };

  setContainer = (container: HTMLElement, bodycolor?: string | null, feetcolor?: string | null, coloringmode?: string | null) => {
    if (container instanceof HTMLElement) {
      this.container = container;
      this.container.id = this.randomID;

      this.container.innerHTML = `
        <div class='line'>
          <div class='marker'></div>
        </div>
  
        <div class='body_shadow' body-part></div>
  
        <div class='back_foot_shadow' body-part></div>
        <div class='back_foot' body-part></div>
  
        <div class='body' body-part></div>
  
        <div class='eyes'>
          <div class='lEye' body-part></div>
          <div class='rEye' body-part></div>
        </div>
  
        <div class='front_foot_shadow' body-part></div>
        <div class='front_foot' body-part></div>`;

      (async () => {
        let style = document.createElement('style');

        if(bodycolor == '' || bodycolor == '-1') bodycolor = null;
        if(feetcolor == '' || feetcolor == '-1') feetcolor = null;

        if ( bodycolor !== null && feetcolor !== null) {
          await this.getTeeImage(bodycolor,feetcolor,coloringmode ?? 'code');
        } else {
          await this.getTeeImage();
        }
        style.innerHTML = `
          #${this.randomID}.tee div[body-part] {
            background-image: url(${this.imageResult});
            background-size: 256em 128em;
            position: absolute;
          }`;
        let tempStyle = document.querySelector(`#${this.randomID}.tee style`);
        if (tempStyle) {
          tempStyle.remove();
        }
        this.container?.appendChild(style);
      })();
      this.lookAt(this.eyesAngle);
    } else {
      throw Error(`Invalid element: container is not of type HTMLElement`);
    }
  };

  teeArray: Tee[] = [];
  teeIDsArray: string[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private elements: Record<string, HTMLCanvasElement>;
  private image: HTMLImageElement;
  private imageLink: string;
  private teeEyesVariables: boolean;
  private eyesAngle: number;
  private randomID: string = '';
  private currentImgData: ImageData | undefined;
  private someImgData: Uint8ClampedArray = new Uint8ClampedArray(0);
  private currentCtx: CanvasRenderingContext2D | undefined;
  private d: number[] = [];
  private isBody: boolean = false;
  private container: HTMLElement | undefined;
  private imageResult: string = "";
  private bodyColor: string = "";
  private feetColor: string = "";
  private coloringMode: string = "";
  private markerCoord: { x: any; y: any } = { x: 0, y: 0 };
  private marker: any;
  private scale: number = 0;
  private teeEyes: any;
  private line: any;
  private eyeMoveEvent: void | undefined;
  private moveTeeEyesFunction: ((e: MouseEvent) => void | undefined) | undefined;
  private originCoord : any;

  constructor(imageLink: string, bodycolor?: string, feetcolor?: string, coloringmode?: string, container?: HTMLElement) {
    this.teeArray.push(this);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.elements = {};
    this.image = new Image();
    this.image.crossOrigin = '';
    this.imageLink = imageLink;
    this.teeEyesVariables = false;
    this.eyesAngle = 0;

    const getID = () => {
      const tempID = this.genRandomID();
      if (this.teeIDsArray.includes(tempID)) {
        getID();
      } else {
        this.randomID = tempID;
      }
    };

    getID();
    this.teeIDsArray.push(this.randomID);
    if (container) {
      this.setContainer(container, bodycolor, feetcolor, coloringmode);
    }

  }

  async loadImage(imageLink: string) {
    this.image.src = imageLink;
    await this.image.decode();
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.canvas.style.width = '256px';
    this.canvas.style.height = '128px';
    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  }

  isRatioLegal = () => {
    const ratio = this.SKIN.size.width / this.SKIN.size.height;
    return this.image.width / this.image.height === ratio;
  };

  getMultiplier = () => {
    return this.image.width / this.SKIN.size.width;
  };

  setColor(color: Color, mode: string) {
    if(this.currentImgData === undefined) return;
    let buffer = this.currentImgData.data;
    let r, g, b, a, byte;

    // Apply color on every pixel of the img
    for (byte = 0; byte < buffer.length; byte += 4) {
      
      // Get pixel
      r = buffer[byte];
      g = buffer[byte + 1];
      b = buffer[byte + 2];
      a = buffer[byte + 3];

      // Overwriting the pixel
      let pixel = new Color(r, g, b, a);
      COLOR_MODE[mode](pixel, color);

      // Replace the pixel in the buffer
      buffer[byte] = pixel.r;
      buffer[byte + 1] = pixel.g;
      buffer[byte + 2] = pixel.b;
      buffer[byte + 3] = pixel.a;
    }
    this.someImgData = buffer;

    this.setCanvas();
  }

  reorderBody() {
    if(this.currentImgData === undefined) return;

    let frequencies = Array(256).fill(0);
    let orgWeight = 0;
    let buffer = this.currentImgData.data;
    let byte;

    const newWeight = 192;
    const invNewWeight = 255 - newWeight;

    // Find the most common frequence
    for (byte = 0; byte < buffer.length; byte += 4) {
    
      if (buffer[byte + 3] > 128) {
        frequencies[buffer[byte]]++;
      }
    }


    for (let i = 1; i < 256; i++) {
      
      if (frequencies[orgWeight] < frequencies[i]) {
        orgWeight = i;
      }
    }
    
		const invOrgWeight = 255 - orgWeight

    for (byte = 0; byte < buffer.length; byte += 4) {
      

      let value = buffer[byte];

      if (value <= orgWeight && orgWeight == 0) {
        continue;
      } else if (value <= orgWeight) {
        value = Math.trunc((value / orgWeight) * newWeight);
      } else if (invOrgWeight == 0) {
        value = newWeight;
      } else {
        value = Math.trunc(
          ((value - orgWeight) / invOrgWeight) * invNewWeight + newWeight
        );
      }

      buffer[byte] = value;
      buffer[byte + 1] = value;
      buffer[byte + 2] = value;
    }
    this.someImgData = buffer;

    this.setCanvas();
  }

  setCanvas() {
    if(this.currentCtx === undefined) return;
    this.currentCtx.putImageData(
      new ImageData(this.someImgData, this.d[2], this.d[3]),
      0,
      0
    );
  }

  getColorArg(color: string, standard: string) {
    if (!Object.keys(COLOR_FORMAT).includes(standard)) {
      throw new Error(
        `Invalid color format: ${standard}\nValid formats: rgb, hsl, code`
      );
    }
    let newColor = COLOR_FORMAT[standard](color);
    return newColor;
  }

  colorLimitForSkin(color: number[], limit = 52.5) {
    if (color[2] < limit) {
      color[2] = limit;
    }
    return color;
  }

  colorConvert(oldColor: string, standard: string) {
    var color: number[] = this.getColorArg(oldColor, standard);

    if (standard === 'rgb') {
      color = RGBToHSL(color[0], color[1], color[2]);
    }
    // Preventing full black or full white skins
    color = this.colorLimitForSkin(color);

    // Convert to RGB to apply the color
    color = HSLToRGB(color[0], color[1], color[2]);

    return new Color(color[0], color[1], color[2]);
  }

  setColor2(color: string, standard: string) {
    let newColor: Color = this.colorConvert(color, standard);
    this.setColor(newColor, 'grayscale');
    if (this.isBody) {
      this.reorderBody();
    }
    this.setColor(newColor, 'default');
  }

  async getTeeImage(player_color_body = 'none',player_color_feet = 'none',coloring_mode = 'code') {
    await this.loadImage(this.imageLink);
    player_color_body = player_color_body.toString();
    player_color_feet = player_color_feet.toString();
    let body_parts = Object.keys(this.SKIN.elements);
    if (this.isRatioLegal()) {
      for (let part in body_parts) {
        let currentPart = body_parts[part];

        this.elements[currentPart] = document.createElement('canvas');
        let tempCanvas = this.elements[currentPart];

        let multiplier = this.getMultiplier();
        this.d = this.SKIN.elements[currentPart].map(
          (x: any) => x * multiplier
        );

        tempCanvas.width = this.d[2];
        tempCanvas.height = this.d[3];

        this.currentCtx = tempCanvas.getContext('2d', {
          willReadFrequently: true,
        })!;

        this.currentCtx.putImageData(this.ctx.getImageData(this.d[0], this.d[1], this.d[2], this.d[3]),0,0);

        if (body_parts[part] === 'body') {
          this.isBody = true;
        } else {
          this.isBody = false;
        }
        this.currentImgData = this.currentCtx.getImageData(0,0,this.d[2],this.d[3]);

        if (player_color_body !== 'none' && player_color_feet !== 'none') {
          if (currentPart.includes('foot')) {
            this.setColor2(player_color_feet, coloring_mode);
          } else if (!currentPart.includes('credits')) {
            this.setColor2(player_color_body, coloring_mode);
          }
        }

        if (Object.keys(this.SKIN.elements)[body_parts.length - 1] === currentPart) {
          this.ctx.clearRect(0,0,this.ctx.canvas.clientWidth,this.ctx.canvas.clientHeight);

          for (let i = 0; i < Object.keys(this.SKIN.elements).length; i++) {
            

            let e = this.SKIN.elements[Object.keys(this.elements)[i]].map((x: any) => x * multiplier);

            this.ctx.drawImage(this.elements[Object.keys(this.elements)[i]], e[0], e[1]);

            if (i === Object.keys(this.SKIN.elements).length - 1) {
              this.imageResult = this.canvas.toDataURL();
              this.bodyColor = player_color_body;
              this.feetColor = player_color_feet;
              this.coloringMode = coloring_mode;
              return this.imageResult;
            }
          }

        }
      }
    } else {
      throw new Error('Image has the wrong ratio.');
    }

    return this.imageResult;
  }

  bindContainer(container: HTMLElement) {
    this.setContainer(container);
  }

  unbindContainer() {
    if (this.container) {
      this.container.removeAttribute('id');
      this.container = undefined;
    }
  }

  teeEyesTranslateFunction() {
    if(this.container !== undefined){
        this.markerCoord = {
        x: this.marker.getBoundingClientRect().x,
        y: this.marker.getBoundingClientRect().y,
        };
        this.scale = this.container.getBoundingClientRect().width / this.container.offsetWidth;
        this.teeEyes.style.transform = `translate(${
        (this.markerCoord.x - this.container.getBoundingClientRect().x) /
        this.scale
        }px, ${
        (this.markerCoord.y - this.container.getBoundingClientRect().y) /
        this.scale
        }px)`;
    }
  }

  setTeeEyesVariables() {
    this.teeEyesVariables = true;

    this.line = document.querySelector(`#${this.randomID}.tee .line`)!;
    this.marker = document.querySelector(`#${this.randomID}.tee .marker`)!;
    this.teeEyes = document.querySelector(`#${this.randomID}.tee .eyes`)!;
  }

  lookAtCursor() {
    this.setTeeEyesVariables();

    this.moveTeeEyesFunction = (e: MouseEvent) => {

      this.originCoord = {
        x: this.line.getBoundingClientRect().x.toFixed(),
        y: this.line.getBoundingClientRect().y.toFixed(),
      };
      this.eyesAngle =
        (Math.atan2(e.clientY - this.originCoord.y, e.clientX - this.originCoord.x) * 180) / Math.PI;
      this.line.style.transform = `translate(-1em, .5em) rotate(${this.eyesAngle}deg)`;
      this.teeEyesTranslateFunction();
    };

    this.eyeMoveEvent = document.addEventListener('mousemove',this.moveTeeEyesFunction);
  }

  dontLookAtCursor() {
    if (this.moveTeeEyesFunction) {
      document.removeEventListener('mousemove', this.moveTeeEyesFunction);
    }
  }

  lookAt(deg = 0) {
    this.eyesAngle = deg;
    this.setTeeEyesVariables();
    this.line.style.transform = `translate(-1em, .5em) rotate(${deg}deg)`;

    this.teeEyesTranslateFunction();
  }
}
