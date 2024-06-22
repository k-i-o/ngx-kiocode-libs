import { Component, OnInit } from '@angular/core';
import { BracketsManagerService, BracketsViewerService } from '../public-api';
import { BracketsViewer, ViewerData } from 'brackets-viewer';

@Component({
  selector: 'k-brackets',
  standalone: true,
  imports: [],
  template: `<div class="kiocode brackets-viewer"></div>`,
  styleUrls: [] 
})
export class BracketsComponent {
    bracketsViewer: BracketsViewer;

    constructor(private bracketManager: BracketsManagerService, private bracketsViewerService: BracketsViewerService) {
        this.bracketsViewer = this.bracketsViewerService.bracketsViewer;
        this.bracketsViewer.addLocale('en', {  
            common: {
              'group-name-winner-bracket': '{{stage.name}}',
              'group-name-loser-bracket': '{{stage.name}} - Repechage',
            },
            'origin-hint': { 
              'winner-bracket': 'WB {{round}}.{{position}}', 
              'winner-bracket-semi-final': 'WB Semi {{position}}',
              'winner-bracket-final': 'WB Final',
              'consolation-final': 'Semi {{position}}', 
            },
        }); // need to be configured

        bracketManager.onUpdate.subscribe({
            next: (data: ViewerData) => {
                this.bracketsViewer.render(data);
            }, 
            error: (error: any) => {
                console.log(error);
            }
        });
        
    }


}
