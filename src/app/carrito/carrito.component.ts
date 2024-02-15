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
    this.verificarProductosRepetidos();
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

  calcularTotal(): number {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      if (producto.stock !== undefined) { // Verifica si stock está definido
        total += parseFloat(producto.precio || '0');
      }
    }
    return total;
  }
  getStockMaximo(producto: Producto): number {
    console.log(producto.stock)
    return producto.stock || 0; // Si el stock es undefined, se asigna 0
  }  

  iniciarSesion() {
    this.router.navigate(['Acceso']); 
  }

  realizarCompra() {
   if (this.calcularTotal() === 0) {
     alert('No hay productos en tu carrito de compras');
     console.log('No hay productos en el carrito');
   } else {
    this.router.navigate(['Factura']); 
    console.log('CheckOut');
   }
  }

  verificarProductosRepetidos(): void {
    const contadorProductos: {[key: string]: number} = {};
  
    // Contar la cantidad de cada producto en el carrito
    for (const producto of this.productosEnCarrito) {
      if (producto.id) { // Asumiendo que cada producto tiene un identificador único (id)
        if (contadorProductos[producto.id]) {
          contadorProductos[producto.id]++;
        } else {
          contadorProductos[producto.id] = 1;
        }
      }
    }
  
    // Imprimir la cantidad de productos repetidos
    for (const idProducto in contadorProductos) {
      if (contadorProductos.hasOwnProperty(idProducto)) {
        const cantidad = contadorProductos[idProducto];
        if (cantidad > 1) {
          console.log(`El producto con ID ${idProducto} se repite ${cantidad} veces en el carrito.`);
        }
      }
    }
  }
  agruparProductos(): { producto: Producto, cantidad: number }[] {
    const productosAgrupados: { producto: Producto, cantidad: number }[] = [];
  
    this.productosEnCarrito.forEach(producto => {
      const index = productosAgrupados.findIndex(item => item.producto.id === producto.id);
      if (index !== -1) {
        productosAgrupados[index].cantidad++;
      } else {
        productosAgrupados.push({ producto, cantidad: 1 });
      }
    });
  
    return productosAgrupados;
  }
  


  
}
