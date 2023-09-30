import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocentePage } from './docente.page';

const routes: Routes = [
  {
    path: '',
    component: DocentePage
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
  },
  {
    path: 'cuenta-d',
    loadChildren: () => import('./cuenta-d/cuenta-d.module').then( m => m.CuentaDPageModule)
  },
  {
    path: 'generador-asis',
    loadChildren: () => import('./generador-asis/generador-asis.module').then( m => m.GeneradorAsisPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocentePageRoutingModule {}
