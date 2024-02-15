import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleFactura } from '../domain/detalleFactura';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {

  private apiUrl = 'http://localhost:8080/epautec/rs/detallefacturas'; // URL del backend API

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo detalle de factura
  crearDetalleFactura(detalleFactura: DetalleFactura): Observable<DetalleFactura> {
    return this.http.post<DetalleFactura>(this.apiUrl, detalleFactura);
  }

  // Método ###
  obtenerDetallesPorEncabezado(idEncabezado: number): Observable<DetalleFactura[]> {
    return this.http.get<DetalleFactura[]>(`${this.apiUrl}?idEncabezado=${idEncabezado}`);
  }

  // Método para actualizar un detalle de factura
  actualizarDetalleFactura(detalleFactura: DetalleFactura): Observable<DetalleFactura> {
    const url = `${this.apiUrl}/${detalleFactura.id}`;
    return this.http.put<DetalleFactura>(url, detalleFactura);
  }

  // Método para eliminar un detalle de factura por su ID
  eliminarDetalleFactura(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
