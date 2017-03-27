import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookStoreComponent } from './name.component';

const routes: Routes = [
    { path: 'path', component: BookStoreComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookStoreBmeRoutingModule { }
