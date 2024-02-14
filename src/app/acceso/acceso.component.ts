import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../domain/usuario';
import { UsuariosService } from '../Servicios/usuarios.service'; 

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {
  nuevoUsuarioRegistro: Usuario = new Usuario();
  nuevoUsuarioInicioSesion: Usuario = new Usuario();
  mensajeError: string = "";

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {}

  registrarUsuario(): void {
    this.usuariosService.obtenerTamañoUsuarios().subscribe(tamaño => {
      this.nuevoUsuarioRegistro.codigo = tamaño + 1;
      this.usuariosService.crearUsuario(this.nuevoUsuarioRegistro)
        .subscribe(
          response => {
            console.log('Usuario creado exitosamente:', response);
            //Envia info
            this.usuariosService.setUsuario(this.nuevoUsuarioRegistro);
            // Redirigir a la página Usuario
            this.router.navigate(['Usuario']);
          },
          error => {
            console.error('Error al crear usuario:', error);
          }
        );
    });
  }

  iniciarSesion(): void {
    if (this.nuevoUsuarioInicioSesion.correo && this.nuevoUsuarioInicioSesion.password) {
      this.usuariosService.obtenerUsuario(this.nuevoUsuarioInicioSesion.correo, this.nuevoUsuarioInicioSesion.password)
        .subscribe(
          usuario => {
            if (usuario) {
              console.log('Inicio de sesión exitoso:', usuario);
              this.usuariosService.setUsuario(usuario);
            // Redirigir a la página Usuario
            this.router.navigate(['Usuario']);
            } else {
              console.error('Correo o contraseña incorrectos.');
              this.mensajeError = 'Correo o contraseña incorrecto.';
            }
          },
          error => {
            console.error('Error al iniciar sesión:', error);
            this.mensajeError = 'Error al iniciar sesión. Inténtalo de nuevo más tarde.';
          }
        );
    } else {
      console.error('Nombre de usuario o contraseña no válidos.');
      this.mensajeError = 'Nombre de usuario o contraseña no válidos.';
    }
  }
}
