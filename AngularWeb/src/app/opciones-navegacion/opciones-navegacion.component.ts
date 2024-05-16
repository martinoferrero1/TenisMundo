import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-navegacion',
  templateUrl: './opciones-navegacion.component.html',
  styleUrls: ['./opciones-navegacion.component.css']
})

export class OpcionesNavegacionComponent {

  constructor(private router: Router) { }

  irAOtraSeccion(seccion: string) {
    this.router.navigate([seccion]);
  }
}
