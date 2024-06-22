import { APP_INITIALIZER } from '@angular/core';
import { BracketsViewerService } from '../_services/brackets-viewer.service';

function initializeBracketsViewer(bracketsViewerService: BracketsViewerService) {
  return () => bracketsViewerService.initBracketsViewer();
}

export function provideBracketsViewer() {
  return {
    provide: APP_INITIALIZER,
    useFactory: initializeBracketsViewer,
    deps: [BracketsViewerService],
    multi: true
  }
}