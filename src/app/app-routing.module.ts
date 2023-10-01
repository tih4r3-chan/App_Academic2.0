import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./pages/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'olvide-password',
    loadChildren: () => import('./pages/olvide-password/olvide-password.module').then( m => m.OlvidePasswordPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./pages/alumno/alumno.module').then( m => m.AlumnoPageModule)
  },
  {
    path: 'docente',
    loadChildren: () => import('./pages/docente/docente.module').then( m => m.DocentePageModule)
  },
  {
    path: 'horario',
    loadChildren: () => import('./pages/horario/horario.module').then( m => m.HorarioPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/alumno/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'asistencia-qr',
    loadChildren: () => import('./pages/alumno/asistencia-qr/asistencia-qr.module').then( m => m.AsistenciaQrPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/alumno/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./pages/docente/asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
  },
  {
    path: 'cuenta-d',
    loadChildren: () => import('./pages/docente/cuenta-d/cuenta-d.module').then( m => m.CuentaDPageModule)
  },
  {
    path: 'generador-asis',
    loadChildren: () => import('./pages/docente/generador-asis/generador-asis.module').then( m => m.GeneradorAsisPageModule)
  },
  {
    path: 'admin-log',
    loadChildren: () => import('./pages/admin-log/admin-log.module').then( m => m.AdminLogPageModule)
  },
  {
    path: 'admin-log',
    loadChildren: () => import('./pages/admin-log/admin-log.module').then( m => m.AdminLogPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-log/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'resgistrar',
    loadChildren: () => import('./pages/admin-log/resgistrar/resgistrar.module').then( m => m.ResgistrarPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./pages/admin-log/modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-log/admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
