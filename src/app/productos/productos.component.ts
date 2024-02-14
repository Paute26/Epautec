import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../Servicios/productos.service';
import { CarritoService } from '../Servicios/carrito.service'; // Importa el servicio del carrito

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos?: any[];

  constructor(private productoService: ProductoService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(
      (data: any[]) => {
        this.productos = data;
      },
      error => {
        console.error('Error al obtener los productos: ', error);
      }
    );
  }

  // Función para agregar un producto al carrito
  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProductoAlCarrito(producto);
    console.log("Agregado Con Exito");
    // Puedes agregar un mensaje de confirmación o redireccionar al usuario al carrito aquí si lo deseas
  }
}
