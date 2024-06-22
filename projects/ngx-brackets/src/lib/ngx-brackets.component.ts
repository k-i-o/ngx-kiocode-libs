import { Component, OnInit } from '@angular/core';
import { BracketsManagerService, BracketsViewerService } from '../public-api';
import { BracketsViewer, ViewerData } from 'brackets-viewer';

@Component({
  selector: 'k-brackets',
  standalone: true,
  imports: [],
  template: `<div class="brackets-viewer"></div>`,
  styles: `
    .brackets-viewer ::ng-deep {
        --c-accent: #8163d9;
        --c-f: #242746;
        --c-f2: #2427464f;
        --c-s: #fafafb;
        --c-t: #11121c;
        
        --primary-background: var(--c-t);
        --secondary-background: var(--c-f);
        --t-background: var(--c-f2);
        --match-background: var(--primary-background);
        --font-color: white;
        --win-color: #50b649;
        --loss-color: #e61a1a;
        --label-color: var(--c-accent);
        --hint-color: #a7a7a7;
        --connector-color: var(--c-f);
        --border-color: var(--c-accent);
        --border-hover-color: var(--c-accent);
        --text-size: 12px;
        --round-margin: 40px;
        --match-width: 150px;
        --match-horizontal-padding: 8px;
        --match-vertical-padding: 6px;
        --connector-border-width: 2px;
        --match-border-width: 2px;
        --match-border-radius: 5px;
    }
    
    .brackets-viewer ::ng-deep {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        background: var(--primary-background);
        color: var(--font-color);
        font-size: var(--text-size);
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        overflow: auto;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        margin: 0 auto;
        padding: 10px 30px;
    }
    
    .brackets-viewer ::ng-deep:empty {
        display: none
    }
  
    .brackets-viewer ::ng-deep *,.brackets-viewer ::ng-deep ::after,.brackets-viewer ::ng-deep ::before {
        box-sizing: border-box
    }
  
    .brackets-viewer ::ng-deep h1,.brackets-viewer ::ng-deep h2,.brackets-viewer ::ng-deep h3 {
        font-weight: 500;
        line-height: 1.2
    }
  
    .brackets-viewer ::ng-deep h1 {
        font-size: 2em;
        margin-top: 30px;
        margin-bottom: 20px
    }

    .brackets-viewer ::ng-deep h2 {
        font-size: 1.7em
    }

    .brackets-viewer ::ng-deep h3 {
        text-align: center;
        background: var(--secondary-background);
        font-size: 1.1em;
        padding: 10px;
        border-radius: var(--match-border-radius);
    }

    .brackets-viewer ::ng-deep .round-robin {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        row-gap: 24px
    }

    .brackets-viewer ::ng-deep .round-robin h1 {
        flex-basis: 100%
    }

    .brackets-viewer ::ng-deep .round-robin h2 {
        text-align: center
    }

    .brackets-viewer ::ng-deep .round-robin .group:not(:last-of-type) {
        margin-right: var(--round-margin)
    }

    .brackets-viewer ::ng-deep .round-robin .group h2 {
        margin: 0 0 25px 0
    }

    .brackets-viewer ::ng-deep .round-robin .group table {
        font-size: 1em;
        margin: 30px 0 20px 0;
        color: #a7a7a7;
        border-collapse: collapse
    }

    .brackets-viewer ::ng-deep .round-robin .group th {
        font-weight: normal;
        text-align: start;
        cursor: help;
        border-bottom: var(--match-border-width) solid var(--border-color)
    }

    .brackets-viewer ::ng-deep .round-robin .group td.hover {
        background: var(--t-background)
    }

    .brackets-viewer ::ng-deep .round-robin .group th,.brackets-viewer ::ng-deep .round-robin .group td {
        padding: 5px
    }

    .brackets-viewer ::ng-deep .round-robin .group td:nth-of-type(2),.brackets-viewer ::ng-deep .round-robin .group td:last-of-type {
        color: var(--font-color);
        font-weight: 500
    }

    .brackets-viewer ::ng-deep .round-robin .round {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        margin: 0 auto
    }

    .brackets-viewer ::ng-deep .bracket h2 {
        font-size: 1.5em;
        color: gray
    }

    .brackets-viewer ::ng-deep .bracket .rounds {
        display: flex
    }

    .brackets-viewer ::ng-deep .bracket .rounds:not(:last-of-type) {
        margin-bottom: 15px
    }

    .brackets-viewer ::ng-deep .bracket .rounds .round {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    .brackets-viewer ::ng-deep .bracket .rounds .round:not(:last-of-type) {
        margin-right: var(--round-margin)
    }

    .brackets-viewer ::ng-deep .match {
        flex: 1;
        display: flex;
        align-items: center;
        margin: 10px 0;
        width: var(--match-width);
        position: relative
    }

    .brackets-viewer ::ng-deep .match.connect-next::after {
        content: "";
        display: block;
        position: absolute;
        right: calc(-1 * var(--round-margin)/2);
        width: calc(var(--round-margin)/2);
        height: 50%;
        border-right: var(--connector-border-width) solid var(--connector-color)
    }

    .brackets-viewer ::ng-deep .match.connect-next:nth-of-type(odd)::after {
        top: 50%;
        border-top: var(--connector-border-width) solid var(--connector-color)
    }

    .brackets-viewer ::ng-deep .match.connect-next:nth-of-type(even)::after {
        top: 0;
        border-bottom: var(--connector-border-width) solid var(--connector-color)
    }

    .brackets-viewer ::ng-deep .match.connect-next.straight::after {
        width: var(--round-margin);
        right: calc(-1*var(--round-margin));
        top: 0;
        border-bottom: var(--connector-border-width) solid var(--connector-color);
        border-top: unset;
        border-right: unset
    }

    .brackets-viewer ::ng-deep .opponents {
        width: 100%;
        position: relative;
        border: var(--match-border-width) solid var(--border-color);
        border-radius: var(--match-border-radius);
        background: var(--match-background)
    }

    .brackets-viewer ::ng-deep .opponents:hover {
        border: var(--match-border-width) solid var(--border-hover-color)
    }

    .brackets-viewer ::ng-deep .opponents>span {
        position: absolute;
        top: -15px;
        font-size: .8em;
        padding: 0 5px;
        color: var(--label-color);
        background: var(--primary-background);
        border-radius: 3px
    }

    .brackets-viewer ::ng-deep .opponents>span:nth-of-type(1) {
        left: 0;
    }

    .brackets-viewer ::ng-deep .opponents>span:nth-of-type(2) {
        right: 3px
    }

    .brackets-viewer ::ng-deep .opponents.connect-previous::before {
        content: "";
        display: block;
        position: absolute;
        left: calc(-1 * var(--round-margin) / 2 - var(--match-border-width));
        width: calc(var(--round-margin) / 2 - var(--match-border-width));
        height: 50%;
        border-bottom: var(--connector-border-width) solid var(--connector-color);
    }

    .bracket:nth-of-type(2) .brackets-viewer ::ng-deep .opponents.connect-previous .opponents.connect-previous.straight::before,.bracket:nth-of-type(1) .brackets-viewer ::ng-deep .opponents.connect-previous .opponents.connect-previous.straight::after {
        border-left: unset;
        left: var(--round-margin);
        width: var(--round-margin)
    }

    .bracket:nth-of-type(1) .brackets-viewer ::ng-deep .opponents.connect-previous.straight::before {
        content: unset
    }

    .bracket:nth-of-type(2) .brackets-viewer ::ng-deep .opponents.connect-previous.straight::after {
        content: unset
    }

    .brackets-viewer ::ng-deep .participant {
        display: flex;
        justify-content: space-between;
        padding: 2px var(--match-horizontal-padding);
        background: var(--match-background)
    }

    .brackets-viewer ::ng-deep .participant.hover {
        background: var(--secondary-background) !important
    }

    .brackets-viewer ::ng-deep .participant:nth-of-type(1) {
        border-bottom: none;
        border-top-left-radius: var(--match-border-radius);
        border-top-right-radius: var(--match-border-radius);
        padding-top: var(--match-vertical-padding)
    }

    .brackets-viewer ::ng-deep .participant:nth-of-type(2) {
        border-top: none;
        border-bottom-left-radius: var(--match-border-radius);
        border-bottom-right-radius: var(--match-border-radius);
        padding-bottom: var(--match-vertical-padding)
    }

    .brackets-viewer ::ng-deep .participant .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 80%
    }

    .brackets-viewer ::ng-deep .participant .name.hint {
        color: var(--hint-color)
    }

    .brackets-viewer ::ng-deep .participant .name>img {
        width: 1em;
        height: 1em;
        margin-right: 4px;
        -o-object-fit: cover;
        object-fit: cover;
        border-radius: 4px;
        vertical-align: middle;
        position: relative;
        bottom: 1px
    }

    .brackets-viewer ::ng-deep .participant .name>span {
        color: var(--hint-color);
        font-size: .9em;
        font-weight: initial
    }

    .brackets-viewer ::ng-deep .participant.win .name {
        font-weight: bold
    }

    .brackets-viewer ::ng-deep .participant .result {
        margin-left: 10px;
        width: 15%;
        text-align: center
    }

    .brackets-viewer ::ng-deep .participant.win .result {
        color: var(--win-color)
    }

    .brackets-viewer ::ng-deep .participant.loss .result {
        color: var(--loss-color)
    }

    #input-mask {
        position: absolute;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 190px;
        top: 50%;
        margin-top: -95px;
        background: #9e9e9e;
        box-shadow: #14191f;
        border-radius: 5px;
        z-index: 1;
        display: none;
        justify-content: center;
        align-items: center
    }

    #input-mask>div {
        text-align: center
    }

    #createNewBracket>div {
        display: grid;
        grid-template-columns: 1fr 2fr;
        margin: 5px;
        align-items: center;
        justify-content: center
    }

    #createNewBracket>div:last-child {
        grid-template-columns: 1fr
    }`
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
