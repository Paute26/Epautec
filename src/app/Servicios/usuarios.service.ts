import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080/epautec/rs/usuarios';
  private usuarioSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  obtenerUsuarioPorMail(mail: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}?mail=${mail}`);
  }

  obtenerTamañoUsuarios(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tamaño`);
  }

  obtenerUsuario(Correo: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}?correo=${Correo}&password=${password}`);
  }

  setUsuario(usuario: Usuario | null): void {
    this.usuarioSubject.next(usuario);
  }

  getUsuario(): Observable<Usuario | null> {
    return this.usuarioSubject.asObservable();
  }
}
