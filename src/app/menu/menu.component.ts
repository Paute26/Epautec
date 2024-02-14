import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router desde @angular/router
import { UsuariosService } from '../Servicios/usuarios.service';
import { Usuario } from '../domain/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() isOpen: boolean = false;
  @Output() menuToggled: EventEmitter<void> = new EventEmitter<void>();
  usuario: Usuario | null = null; // Variable para almacenar el usuario

  constructor(private elementRef: ElementRef, 
              private usuariosService: UsuariosService,
              private router: Router) { // Inyecta Router en el constructor
    // Suscribirse al Observable del servicio para obtener el usuario actualizado
    this.usuariosService.getUsuario().subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuToggled.emit();
  }

  enviarReferencia() {
    this.isOpen = false;
    this.menuToggled.emit();
  }

  personalizado() {
    this.isOpen = false;
    this.menuToggled.emit();
    if (this.usuario && this.usuario.codigo && this.usuario.codigo > 0) {
      console.log('Hay información de usuario con código válido:', this.usuario.codigo);
    } else {
      console.log('No hay información de usuario o el código no es válido.');
      this.router.navigate(['Acceso']); 
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideMenu = this.elementRef.nativeElement.contains(event.target as Node);
    const clickedOnMenuIcon = (event.target as HTMLElement).closest('.menu-icon');
    if (!clickedInsideMenu && !clickedOnMenuIcon && this.isOpen) {
      this.isOpen = false;
      this.menuToggled.emit();
    }
  }
}
