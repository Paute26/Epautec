import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../domain/producto'; // Asegúrate de importar el modelo de Producto si existe

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productosEnCarrito: Producto[] = [];

  constructor() { }

  // Función para agregar un producto al carrito
  agregarProductoAlCarrito(producto: Producto) {
    this.productosEnCarrito.push(producto);
  }

  // Función para obtener los productos del carrito
  obtenerProductosEnCarrito(): Observable<Producto[]> {
    return of(this.productosEnCarrito);
  }

  // Función para eliminar un producto del carrito
  eliminarProductoDelCarrito(producto: Producto) {
    const index = this.productosEnCarrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productosEnCarrito.splice(index, 1);
    }
  }

  // Función para vaciar el carrito
  vaciarCarrito() {
    this.productosEnCarrito = [];
  }
}
