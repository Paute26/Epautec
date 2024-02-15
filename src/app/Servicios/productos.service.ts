import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../domain/producto'; // Asegúrate de importar el modelo Producto si lo tienes definido

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:8080/epautec/rs/productos'; 
  // URL base de tu servicio REST en Java http://localhost:8080/epautec/api/productos

  constructor(private http: HttpClient) { }

  // Función para obtener todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/list`);
  }

  // Función para obtener un producto por su ID
  obtenerProductoPorNombre(nombre: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}?nombre=${nombre}`);
  }

  // Función para crear un nuevo producto
  crearProducto(producto: Producto): Observable<any> {
    return this.http.post(`${this.baseUrl}`, producto);
  }

  // Función para actualizar un producto existente
  actualizarProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.baseUrl}`, producto);
  }

  // Función para eliminar un producto por su ID
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }
}
