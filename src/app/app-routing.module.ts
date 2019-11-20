import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CasasComponent } from './pages/casas/casas.component';
import { CasaComponent } from './pages/casa/casa.component';

const routes: Routes = [
  { path: 'casas', component: CasasComponent },
  { path: 'casa/:id', component: CasaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'casas' }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
