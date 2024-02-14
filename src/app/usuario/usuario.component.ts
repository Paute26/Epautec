import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UsuariosService } from '../Servicios/usuarios.service';
import { Usuario } from '../domain/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.getUsuario().subscribe(usuario => {
      this.usuario = usuario !== null ? usuario : new Usuario(); // Asignar un usuario vacío en caso de que sea null
    });
  }
  

  logout(): void {
    // Envía un usuario vacío al servicio de usuarios
    this.usuariosService.setUsuario(new Usuario());
    this.router.navigate(['Acceso']); 
  }
}
