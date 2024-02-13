import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { AccesoComponent } from './acceso/acceso.component';

const routes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: 'Menu', component: MenuComponent },
  { path: 'Acceso', component: AccesoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
