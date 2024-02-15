import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncabezadoFactura } from '../domain/encabezadoFactura';

@Injectable({
  providedIn: 'root'
})
export class EncabezadoFacturaService {
  private apiUrl = 'http://localhost:8080/epautec/rs/Facturas';

  constructor(private http: HttpClient) { }

  crearEncabezadoFactura(encabezadoFactura: EncabezadoFactura): Observable<any> {
    return this.http.post<any>(this.apiUrl, encabezadoFactura);
  }

  actualizarEncabezadoFactura(encabezadoFactura: EncabezadoFactura): Observable<EncabezadoFactura> {
    return this.http.put<EncabezadoFactura>(this.apiUrl, encabezadoFactura);
  }

  borrarEncabezadoFactura(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  buscarEncabezadoFacturaPorId(id: number): Observable<EncabezadoFactura> {
    return this.http.get<EncabezadoFactura>(`${this.apiUrl}/${id}`);
  }

  listarEncabezadosFactura(): Observable<EncabezadoFactura[]> {
    return this.http.get<EncabezadoFactura[]>(`${this.apiUrl}/list`);
  }

  obtenerTamañoEncabezado(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tamaño`);
  }
}

