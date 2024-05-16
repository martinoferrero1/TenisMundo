
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConfirmacionServicio {
  visible = false;
  nombre_jugador: string = '';

  abrir(nombre: string) {
    this.nombre_jugador = nombre;
    this.visible = true;
  }

  cerrar() {
    this.visible = false;
  }

  esVisible() {
    return this.visible;
  }

  retornarNombreJugador() {
    return this.nombre_jugador;
  }
}