import { Component, Input } from '@angular/core';
import { AvisoErrorServicio } from './aviso-error-servicio';

@Component({
  selector: 'app-aviso-error',
  templateUrl: './aviso-error.component.html',
  styleUrls: ['./aviso-error.component.css']
})
export class AvisoErrorComponent {
  @Input() operacion: string = '';

  constructor(private avisoErrorServicio: AvisoErrorServicio) {}

  aceptar() {
    this.avisoErrorServicio.cerrar();
  }

  ventanaVisible() {
    return this.avisoErrorServicio.esVisible();
  }
}
