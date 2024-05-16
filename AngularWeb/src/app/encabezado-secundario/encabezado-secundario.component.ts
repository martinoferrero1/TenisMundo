import { Component } from '@angular/core';

@Component({
  selector: 'app-encabezado-secundario',
  templateUrl: './encabezado-secundario.component.html',
  styleUrls: ['./encabezado-secundario.component.css']
})
export class EncabezadoSecundarioComponent {

  retornarSeccionAnterior(): void {
    window.history.back();
  }
}
