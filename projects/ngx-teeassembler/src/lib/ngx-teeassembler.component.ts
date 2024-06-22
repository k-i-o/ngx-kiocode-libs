import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Tee } from './_declarations/Tee';

@Component({
  selector: 'k-teeassembler',
  standalone: true,
  imports: [],
  template: `<div class='tee' [style.font-size]="fontSize" [style.width]="width" [style.heigth]="height"></div>`,
  styles: `
    /*
      TeeAssembler 4.0

      Made by Aleksandar Blažić
      And converted to typescript by Samuele Radici (kio) Angular 18
      Discord: Alexander_#6686
      Discord: everestkio
      
    */

    .tee {
      font-size: 1px;
      position: relative;
      width: 80px;
      height: 80px;
    }

    .tee ::ng-deep .back_foot,
    .tee ::ng-deep .back_foot_shadow,
    .tee ::ng-deep .front_foot,
    .tee ::ng-deep .front_foot_shadow {
      width: 64em;
      height: 32em;
    }
    
    .tee ::ng-deep .back_foot_shadow {
      background-position: -192em -64em;
      top: 52em;
      left: 4em;
      transform: scale(1.2);
    }
    
    .tee ::ng-deep .back_foot {
      background-position: -192em -32em;
      top: 51em;
      left: 7em;
      transform: scale(1.4);
    }
    
    .tee ::ng-deep .body,
    .tee ::ng-deep .body_shadow {
      width: 96em;
      height: 96em;
      transform: scale(0.9);
      top: 0;
    }
    
    .tee ::ng-deep .body_shadow {
      background-position: -96em 0;
    }
    
    .tee ::ng-deep .body {
      background-position: 0 0;
    }
    
    .tee ::ng-deep .front_foot_shadow {
      background-position: -192em -64em;
      top: 52em;
      left: 28em;
      transform: scale(1.2);
    }
    
    .tee ::ng-deep .front_foot {
      background-position: -192em -32em;
      top: 51em;
      left: 26em;
      transform: scale(1.35);
    }
    
    .tee ::ng-deep .lEye,
    .tee ::ng-deep .rEye {
      display: inline-flex;
      width: 32em;
      height: 32em;
      background-position: -64em -96em;
      filter: brightness(1);
    }
    
    .tee ::ng-deep .lEye {
      left: -22em;
      top: -21em;
      transform: scale(1.08);
    }
    
    .tee ::ng-deep .rEye {
      left: -9em;
      top: -21em;
      transform: scale(1.08) rotateY(-180deg);
    }
    
    .tee ::ng-deep .line {
      width: 9.5em;
      height: 1em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: 0.5em 0.5em;
      opacity: 0;
    }
    
    .tee ::ng-deep .marker {
      width: 1em;
      height: 1em;
      position: absolute;
      right: -1em;
      opacity: 0;
    }`
})
export class TeeAssemblerComponent implements OnInit {

  @Input() skinImage?: string;
  @Input() lookMouse?: boolean;
  @Input() eyesAngle?: number;
  @Input() size?: number;
  @Input() bodyColor?: string;
  @Input() feetColor?: string;
  @Input() colorMode?: string;

  fontSize: string = '';
  height: string = '';
  width: string = '';

  constructor() {}

  ngOnInit() {
    if(this.skinImage) {      

      const myTee = new Tee(this.skinImage, this.bodyColor, this.feetColor, this.colorMode, (document as any).querySelector('.tee'));
      if(this.size) {
        this.fontSize = (this.size/100).toString() + "px";
        this.height = this.size + "px";
        this.width = this.size + "px";
      }

      myTee.lookAt(0);

      if(this.lookMouse) {
        myTee.lookAtCursor();
      }else if(this.eyesAngle){
        myTee.lookAt(this.eyesAngle);
      }
    }

  }

}
