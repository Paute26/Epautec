import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { AccesoComponent } from './acceso/acceso.component';
import { ContactoComponent } from './contacto/contacto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FacturaComponent } from './factura/factura.component';

const routes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: 'Menu', component: MenuComponent },
  { path: 'Acceso', component: AccesoComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'Usuario', component: UsuarioComponent },
  { path: 'Productos', component: ProductosComponent },
  { path: 'Carrito', component: CarritoComponent } ,
  { path: 'Factura', component: FacturaComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
