import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { AccesoComponent } from './acceso/acceso.component';
import { ContactoComponent } from './contacto/contacto.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: 'Menu', component: MenuComponent },
  { path: 'Acceso', component: AccesoComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'Usuario', component: UsuarioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
