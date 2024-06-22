import { Injectable } from '@angular/core';
import { BracketsViewer } from 'brackets-viewer';

@Injectable({
  providedIn: 'root'
})
export class BracketsViewerService {
  private scripts: { [key: string]: { loaded: boolean; src: string } } = {};
  bracketsViewer!: BracketsViewer;

  constructor() {}

  async initBracketsViewer() {
    if(!this.bracketsViewer) {
      await this.loadScript('bracketsViewer', 'https://cdn.jsdelivr.net/gh/Drarig29/brackets-viewer.js@09a5e578e4e6bd76db06b380e79ef2a3bedb8e92/dist/brackets-viewer.min.js')
      .catch((error: any) => console.error('Error loading brackets-viewer.min.js:', error));  
  
      this.bracketsViewer = (window as any).bracketsViewer;
    }
  }

  loadScript(name: string, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scripts[name] && this.scripts[name].loaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => {
        this.scripts[name] = { loaded: true, src: src };
        resolve();
      };
      script.onerror = (error: any) => reject(error);

      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
