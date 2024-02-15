import { Producto } from './producto'; // Importa la clase Producto si está en un archivo separado
import { EncabezadoFactura } from './encabezadoFactura';

export class DetalleFactura {
  id?: number;
  producto?: Producto;
  cantidad?: number;
  precioUnitario?: number;
  encabezadoFactura?: EncabezadoFactura;
}