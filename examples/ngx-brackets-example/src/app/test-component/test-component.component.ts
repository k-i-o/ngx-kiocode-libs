import { Component, OnInit } from '@angular/core';
import { BracketsComponent, BracketsManagerService, BracketsViewerService, Datasets } from '../../../../../dist/ngx-brackets';
import { BracketsViewer, ViewerData } from 'brackets-viewer';

@Component({
  selector: 'app-test-component', 
  standalone: true,
  imports: [BracketsComponent], 
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.less'
})
export class TestComponentComponent implements OnInit {

  constructor(private bracketsManagerService: BracketsManagerService) {}

  async ngOnInit() {

    await this.bracketsManagerService.createTournament(0, Datasets.dataset16Members);

  }
  
}
