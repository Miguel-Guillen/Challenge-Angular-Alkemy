import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { EquipoComponent } from './components/equipo/equipo.component'
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  { path: 'equipo', component: EquipoComponent, canActivate: [AuthGuard] },
  { path: 'buscar', component: BuscadorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'detalles/:id', component: DetallesComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'equipo' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
