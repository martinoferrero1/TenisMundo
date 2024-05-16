
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AvisoErrorServicio {
  visible = false;

  abrir() {
    this.visible = true;
  }

  cerrar() {
    this.visible = false;
  }

  esVisible() {
    return this.visible;
  }
}