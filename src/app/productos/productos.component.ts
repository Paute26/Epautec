import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../Servicios/productos.service'; // Importa el servicio para obtener los productos

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos?: any[]; // Arreglo para almacenar los productos

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos(); // Llama a la función para obtener los productos al inicializar el componente
  }

  // Función para obtener los productos desde el servicio
  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(
      (data: any[]) => {
        this.productos = data; // Asigna los productos obtenidos del servicio al arreglo de productos
      },
      error => {
        console.error('Error al obtener los productos: ', error);
      }
    );
  }
}
