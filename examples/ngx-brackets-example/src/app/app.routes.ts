import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';

export const routes: Routes = [
    {
        path: 'example', component: TestComponentComponent
    },
    {
        path: '**', redirectTo: '/example', pathMatch: 'full'
    }
];
