import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmacionServicio } from './confirmacion-servicio';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {
  @Input() confirmacion: string = '';
  @Input() cantidad_eliminados: number = 0;
  @Output() confirmado = new EventEmitter<void>();

  constructor(private confirmacionServicio: ConfirmacionServicio) {}

  confirmar() {
    this.confirmado.emit();
    this.cerrarVentana();
  }

  cancelar() {
    this.cerrarVentana();
  }

  cerrarVentana() {
    this.confirmacionServicio.cerrar();
  }

  ventanaVisible() {
    return this.confirmacionServicio.esVisible();
  }

  obtenerNombre() {
    return this.confirmacionServicio.retornarNombreJugador();
  }
}
