import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../Servicios/usuarios.service';
import { CarritoService } from '../Servicios/carrito.service';
import { Producto } from '../domain/producto';
import { Usuario } from '../domain/usuario';

@Component({
    selector: 'app-factura',
    templateUrl: './factura.component.html',
    styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
    productosEnFactura: { producto: Producto, cantidad: number }[] = [];
    usuario: Usuario | null = null;

    constructor(private usuariosService: UsuariosService, private carritoService: CarritoService) { }

    ngOnInit(): void {
        this.obtenerUsuario();
        this.obtenerProductosEnCarrito();
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
confirmarCompra(): void {
  // Implementar la lógica para confirmar la compra
}
  
}
