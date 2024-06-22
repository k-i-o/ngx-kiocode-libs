import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeeAssemblerComponent } from '../../../../dist/ngx-teeassembler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeeAssemblerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'ngx-teeassembler-example';

  skinUrl = 'https://ddnet.org/skins/skin/community/ahl_shadow.png';

}
