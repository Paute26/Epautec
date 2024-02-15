import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { CarritoService } from '../Servicios/carrito.service';
import { UsuariosService } from '../Servicios/usuarios.service';
import { Usuario } from '../domain/usuario';
import { Producto } from '../domain/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productosEnCarrito: Producto[] = [];
  usuario: Usuario | null = null; // Agrega la propiedad usuario

  constructor(
    private carritoService: CarritoService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verificarAutenticacion(); // Verifica la autenticación al iniciar el componente
    this.obtenerProductosEnCarrito();
  }

  obtenerProductosEnCarrito() {
    this.carritoService.obtenerProductosEnCarrito().subscribe(productos => {
      this.productosEnCarrito = productos;
    });
  }

  eliminarProducto(producto: Producto) {
    this.carritoService.eliminarProductoDelCarrito(producto);
    console.log('Eliminacion exitosa');
  }

  verificarAutenticacion() {
    this.usuariosService.getUsuario().subscribe(
      (usuario: Usuario | null) => {
        if (usuario && Object.keys(usuario).length !== 0) {
          this.usuario = usuario; // Asigna el usuario obtenido del servicio si existe información dentro del objeto
        } else {
          this.usuario = null; // Si el usuario está vacío, establece usuario como null
        }
      },
      error => {
        console.error('Error al obtener la información del usuario: ', error);
      }
    );
  }
  
  

  iniciarSesion() {
    this.router.navigate(['Acceso']); 
  }

  realizarCompra() {
    // Aquí puedes agregar la lógica para realizar la compra
  }
}
