import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoPage } from './alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnoPage
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'asistencia-qr',
    loadChildren: () => import('./asistencia-qr/asistencia-qr.module').then( m => m.AsistenciaQrPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoPageRoutingModule {}
