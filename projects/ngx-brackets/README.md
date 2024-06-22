# NgxBrackets (pre-alpha first attempt) - unstable

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.0.

## Usage

If you need to use BracketsViewer you MUST use provideBracketsViewer() method inside app.config.ts

## Examples

### INIT VIEWER
``` js
import { ApplicationConfig } from '@angular/core';

import { provideBracketsViewer } from '@kiocode/ngx-brackets';

export const appConfig: ApplicationConfig = {
  providers: [provideBracketsViewer()]
};
```

### CONFIGURE THEME
``` css
/* styles.css */
@import '../../../dist/ngx-brackets/src/lib/_theme/theme.css'; /* default css */
@import '../../../dist/ngx-brackets/src/lib/_theme/blue-theme.css'; /* colored theme */

/* ALL POSSIBLE THEMES (choose one of these) */
@import '../../../dist/ngx-brackets/src/lib/_theme/blue-theme.css';
@import '../../../dist/ngx-brackets/src/lib/_theme/brown-theme.css';
@import '../../../dist/ngx-brackets/src/lib/_theme/green-theme.css';
@import '../../../dist/ngx-brackets/src/lib/_theme/orange-theme.css';
@import '../../../dist/ngx-brackets/src/lib/_theme/pink-theme.css';
@import '../../../dist/ngx-brackets/src/lib/_theme/red-theme.css';
@import '../../../dist/ngx-brackets/src/lib/_theme/violet-theme.css';
@import '../../../dist/ngx-brackets/src/lib/_theme/yellow-theme.css';
```

### IN THE HTML COMPONENT FILE
``` html
<k-brackets></k-brackets>
```

### CREATE TOURNAMENT
``` js
import { Component, OnInit } from '@angular/core';
import { BracketsComponent, BracketsManagerService, Datasets } from '@kiocode/ngx-brackets';

@Component({
  selector: 'app-test-component', 
  standalone: true,
  imports: [BracketsComponent], 
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.less'  
}) 
export class TestComponentComponent implements OnInit {
  private tournamentId: number = 0;

  constructor(private bracketsManagerService: BracketsManagerService) {}

  async ngOnInit() {
    await this.bracketsManagerService.createTournament(this.tournamentId, Datasets.dataset16Members);
  }
}
```