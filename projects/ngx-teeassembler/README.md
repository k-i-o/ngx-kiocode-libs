# TeeAssembler 4.0 Angular 18

TeeAssembler 4.0 Angular 18 is a script used for coloring a TeeWorlds/DDNet skins image the same way TeeWorlds/DDNet does and rendering the image in your browser using only CSS and TypeScript (and animate the eyes), you can implement it in your Angular 18 project using `npm i @k-i-o/ngx-teeassembler`.

---
## Credits

Converted to TypeScript and implemented in an Angular 18 library by **Samuele Radici (kio)**

Thanks to [b0th#6474](https://github.com/theobori) for helping Aleksandar with the original project.

And thank you [.alexander](https://github.com/AlexIsTheGuy) for helping me and allowing me to do this project

## Project Infos

Base project: [tw-utils](https://github.com/theobori/tw-utils).

Original project: [TeeAssembler-2.0](https://github.com/AlexIsTheGuy/TeeAssembler-2.0).

---
## Release

The npm package is released on npmjs.com [ngx-teeassembler](https://www.npmjs.com/package/@k-i-o/ngx-teeassembler).

---
## Usage

### Installation: 

`npm i @k-i-o/ngx-teeassembler`


### Importing inside a component module: 

```JS

import { Component } from '@angular/core';

...

import { TeeAssemblerComponent } from "ng-tee-assembler";

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TeeAssemblerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.less'
})
export class ExampleComponent { }

```


### Implementation:

#### NOTE: YOU WILL HAVE TO CHOOSE A SIZE FOR THE TEE OR THE EYES CAN BE BUGGY

### Automatic Rendering (No coloring)

```html
<k-teeassembler [size]="92" [skinImage]="'https://api.skins.tw/api/resolve/skins/mouse'"></k-teeassembler>
```

### Automatic Rendering (With coloring)

```html
<k-teeassembler [size]="92" [skinimage]="'https://api.skins.tw/api/resolve/skins/mouse'" [bodyColor]="'13149440'" [feetColor]="'255'" data-coloringmode='code'></k-teeassembler>

```

### You can also make eyes look at the mouse

```html
<k-teeassembler [size]="92" [skinimage]="'https://api.skins.tw/api/resolve/skins/mouse'" [lookMouse]="true"></k-teeassembler>

```
Note: The value of data-lookmouse must be "true" to set it to false you can simply remove the data attribute


### You can also add an angle to the eyes

```html
<k-teeassembler [size]="92" [skinimage]="'https://api.skins.tw/api/resolve/skins/mouse'" [eyesAngle]="90"></k-teeassembler>

```
Note: The value of data-look is the angle and must be an int


### Set an attibute with a variable (you can do it with any parameter)

```html
<k-teeassembler [size]="92" [skinimage]="variablename" [eyesAngle]="variablename2"></k-teeassembler>

```
Note: The variable must be declared in the ts component


---

## Known issues

- Eyes are not perfectly aligned like in the game but it's close enough.


---

## Preview

![image](https://github.com/k-i-o/NgTeeAssembler/assets/68398653/714e0940-6a2e-4fe1-8a5e-7e2c58c12935)
![image](https://github.com/k-i-o/NgTeeAssembler/assets/68398653/c3480135-ca0d-4093-a742-92f71b481f38)
![demo](https://github.com/k-i-o/NgTeeAssembler/assets/68398653/a2510abb-9cfc-42b3-b19d-62203de40949)

---
# Developers

## Building / Exporting
Build: `ng build ngx-teeassembler`

Pack: `cd dist/ngx-teeassembler && npm pack`


## Contact

You can contact me on Discord for anything related to the fork of the original project: everestkio

Contact of the original project owner: .alexander_

---
## License

Copyright (c) 2022 Aleksandar Blažić

Copyright (c) 2023/2024 Samuele Radici

Licensed under the [MIT](https://github.com/k-i-o/NgTeeAssembler/blob/main/LICENSE) license.

