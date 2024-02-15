import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../Servicios/usuarios.service';
import { CarritoService } from '../Servicios/carrito.service';
import { Producto } from '../domain/producto';
import { Usuario } from '../domain/usuario';
import { EncabezadoFactura } from '../domain/encabezadoFactura';
import { EncabezadoFacturaService } from '../Servicios/encabezado-factura.service';
import { Router } from '@angular/router';
import { DetalleFacturaService } from '../Servicios/detalle-factura.service';
import { DetalleFactura } from '../domain/detalleFactura';

@Component({
    selector: 'app-factura',
    templateUrl: './factura.component.html',
    styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
    productosEnFactura: { producto: Producto, cantidad: number }[] = [];
    usuario: Usuario | null = null;
    encabezadoFactura: EncabezadoFactura = new EncabezadoFactura();
    fechaActual: string = '';

    constructor(private usuariosService: UsuariosService, 
        private carritoService: CarritoService,
        private encabezadoFacturaService: EncabezadoFacturaService,
        private detalleFacturaService: DetalleFacturaService,
        private router: Router) { }

    ngOnInit(): void {
        this.obtenerUsuario();
        this.obtenerProductosEnCarrito();
        this.obtenerFechaActual();
    }
    obtenerFechaActual(): void {
        const fecha = new Date();
        this.fechaActual = fecha.toISOString().split('T')[0];
      }

    obtenerUsuario(): void {
        this.usuariosService.getUsuario().subscribe(
            (usuario: Usuario | null) => {
                this.usuario = usuario;
            },
            error => {
                console.error('Error al obtener la información del usuario: ', error);
            }
        );
    }

    obtenerProductosEnCarrito(): void {
        this.carritoService.obtenerProductosEnCarrito().subscribe(productos => {
            this.productosEnFactura = productos.map(producto => ({ producto, cantidad: 1 }));
        });
    }

    calcularTotalFactura(): number {
      return this.productosEnFactura.reduce((total, item) => {
          const precio = item.producto.precio; // Obtener el precio del producto
          if (precio !== undefined) { // Verificar si el precio está definido
              const precioNumerico = parseFloat(precio); // Convertir precio a número
              if (!isNaN(precioNumerico)) { // Verificar si es un número válido
                  return total + (precioNumerico * item.cantidad);
              }
          }
          console.log(total);
          return total; // Si el precio es undefined o no es un número válido, no se suma al total
      }, 0);
  }
  calcularTotalProducto(item: { producto: Producto, cantidad: number }): number {
    const precio = parseFloat(item.producto.precio || '0'); // Si el precio es undefined, establece 0 como valor predeterminado
    if (!isNaN(precio)) {
        return precio * item.cantidad;
    }
    return 0;
}
private crearEncabezadoFactura(): void {
    this.encabezadoFactura.fecha = this.fechaActual; // Asignar la fecha actual al encabezado de factura
    this.encabezadoFactura.total = this.calcularTotalFactura(); // Calcular el monto total de la factura
    this.encabezadoFactura.usuario = this.usuario!; // Asignar el usuario que realiza la compra
    
    // Obtener el tamaño de los encabezados existentes
    this.encabezadoFacturaService.obtenerTamañoEncabezado().subscribe(
      tamaño => {
        // Asignar el nuevo ID al encabezado de factura
        this.encabezadoFactura.id = tamaño + 10;
        
        // Llamar al servicio para crear el encabezado de factura
        this.encabezadoFacturaService.crearEncabezadoFactura(this.encabezadoFactura)
          .subscribe(
            response => {
              console.log('Factura creada exitosamente:', response);
              console.log(this.encabezadoFactura);
              this.crearDetalleFactura();
              this.router.navigate(['Usuario']); 
            },
            error => {
              console.error('Error al crear la factura:', error);
              // Aquí puedes manejar el error de acuerdo a tus necesidades
            }
          );
      },
      error => {
        console.error('Error al obtener el tamaño del encabezado:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }

  crearDetalleFactura(): void {
    // Recorrer la lista de productos en la factura
    this.productosEnFactura.forEach(item => {
        const detalleFactura = new DetalleFactura();
        detalleFactura.producto = item.producto; // Asignar el producto al detalle de factura
        detalleFactura.cantidad = item.cantidad; // Asignar la cantidad al detalle de factura
        detalleFactura.precioUnitario = parseFloat(item.producto?.precio || '0'); // Asignar el precio unitario al detalle de factura
        detalleFactura.encabezadoFactura = this.encabezadoFactura; // Asignar el encabezado de factura al detalle de factura

        // Guardar el detalle de factura en la base de datos
        this.detalleFacturaService.crearDetalleFactura(detalleFactura).subscribe(
            response => {
                console.log('Detalle de factura creado exitosamente:', response);
                
            },
            error => {
                console.error('Error al crear el detalle de factura:', error);
                // Aquí puedes manejar el error de acuerdo a tus necesidades
            }
        );
    });
}

  confirmarCompra(): void {
    // Lógica para confirmar la compra
    this.crearEncabezadoFactura();
    
  }
  
  
}
