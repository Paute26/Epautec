import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../Servicios/carrito.service';
import { Producto } from '../domain/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productosEnCarrito: Producto[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
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
}
