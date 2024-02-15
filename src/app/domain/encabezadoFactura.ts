import { Usuario } from './usuario'; 

export class EncabezadoFactura {
  id?: number;
  fecha?:String;
  usuario?: Usuario;
  total?: number;
}
