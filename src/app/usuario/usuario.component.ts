import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UsuariosService } from '../Servicios/usuarios.service';
import { Usuario } from '../domain/usuario';
import { EncabezadoFactura } from '../domain/encabezadoFactura'; // Importa el modelo de factura si es necesario
import { EncabezadoFacturaService } from '../Servicios/encabezado-factura.service'; // Importa el servicio de facturas
import { DetalleFacturaService } from '../Servicios/detalle-factura.service';
import { DetalleFactura } from '../domain/detalleFactura';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario | null = null;
  facturas: EncabezadoFactura[] = [];
  detallesPorFactura: { [id: number]: DetalleFactura[] } = {};

  constructor(private usuariosService: UsuariosService, 
              private facturaService: EncabezadoFacturaService,
              private detalleFacturaService: DetalleFacturaService,
              private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.getUsuario().subscribe(usuario => {
      this.usuario = usuario !== null ? usuario : new Usuario(); // Asignar un usuario vacío en caso de que sea null
      this.obtenerFacturasUsuario(); // Llama al método para obtener las facturas del usuario
    });
  }
  
  obtenerFacturasUsuario() {
    this.facturaService.listarEncabezadosFactura().subscribe(
      (facturas) => {
        // Filtrar las facturas por el ID del usuario
        this.facturas = facturas.filter(factura => factura.usuario?.codigo === this.usuario?.codigo);
      },
      (error) => {
        console.error('Error al obtener las facturas:', error);
      }
    );
  }
 obtenerDetallesPorFactura(facturaId?: number) {
  if (facturaId === undefined) {
    console.error('ID de factura no definido');
    return;
  }
  this.detalleFacturaService.obtenerDetallesPorEncabezado(facturaId).subscribe(
    (detalles) => {
      this.detallesPorFactura[facturaId] = detalles;
    },
    (error) => {
      console.error('Error al obtener los detalles de la factura:', error);
    }
  );
}

  

  logout(): void {
    // Envía un usuario vacío al servicio de usuarios
    this.usuariosService.setUsuario(new Usuario());
    this.router.navigate(['Acceso']); 
  }

  irACarrito(): void {
    this.router.navigate(['Carrito']); 
  }
}
