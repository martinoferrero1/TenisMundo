import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmacionServicio } from '../confirmacion/confirmacion-servicio';
import { FiltradoJugadoresServicio } from '../filtrado-jugadores/filtrado-jugadores-servicio';

interface Jugador {
  _id: String,
  nombre: String;
  pais: String;
  bandera_pais: String;
  entrenador?: String;
  retiro?: Number;
}

@Component({
  selector: 'app-editaryeliminar-jugadores',
  templateUrl: './editaryeliminar-jugadores.component.html',
  styleUrls: ['./editaryeliminar-jugadores.component.css']
})
export class EditarYEliminarJugadoresComponent {
  jugadores: Jugador[] = [];
  jugadores_marcados: number = 0;
  id_jugadores_marcados: String[] = [];
  jugadores_por_pagina: number = 5;
  pagina_actual: number = 1;

  constructor(private router: Router, private http: HttpClient, private confirmacionServicio: ConfirmacionServicio, private filtradoJugadoresServicio: FiltradoJugadoresServicio) { }

  confirmarEliminacion() {
    this.confirmacionServicio.abrir(''); //ya que en este caso no se utiliza el nombre de un jugador en especifico
  }

  private actualizarArreglo(arreglo_actualizar: Jugador[], arreglo_id_eliminados: String[]) {
    for (let i = arreglo_actualizar.length-1; i >= 0; i--) {
      const indice = arreglo_id_eliminados.indexOf(arreglo_actualizar[i]._id);
      if (indice > -1)
        arreglo_actualizar.splice(i, 1);
    }
  }

  eliminacionConfirmada() {
    const jugadores_eliminados = this.id_jugadores_marcados;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.delete('http://localhost:3000/Jugadores/eliminarjugadores', { headers, body: jugadores_eliminados }).subscribe(() => {
      this.pagina_actual = 1;
    });
    this.actualizarArreglo(this.jugadores, jugadores_eliminados);                 
    this.id_jugadores_marcados.splice(0, this.id_jugadores_marcados.length);
    this.jugadores_marcados = 0;
  }

  marcarODesmarcar(id: String) {
    const indice_id = this.id_jugadores_marcados.indexOf(id);
    if (indice_id == -1) {
      this.id_jugadores_marcados.push(id);
      this.jugadores_marcados++;
    }
    else {
      this.id_jugadores_marcados.splice(indice_id, 1);
      this.jugadores_marcados--;
    }
  }

  desmarcarTodos() {
    this.id_jugadores_marcados.splice(0, this.id_jugadores_marcados.length);
    this.jugadores_marcados = 0;
  }

  marcarODesmarcarTodos() {
    const cantidad_jugadores = this.jugadores.length;
    if (this.id_jugadores_marcados.length == cantidad_jugadores)
      this.desmarcarTodos();
    else {
      let todos_los_id: String[] = [];
      for (let i = 0; i < cantidad_jugadores; i++) {
        const jugador = this.jugadores[i];
        todos_los_id.push(jugador._id);
      }
      this.id_jugadores_marcados = todos_los_id;
      this.jugadores_marcados = cantidad_jugadores;
    }
  }

  verDetallesJugador(id: String) {
    this.router.navigate(['/jugador/' + id]);
  }

  irAEdicionJugador(id: String) {
    this.router.navigate(['/editarjugador/' + id]);
  }

  obtenerJugadoresPaginaActual(): Jugador[] {
    const indice_inicial = (this.pagina_actual - 1) * this.jugadores_por_pagina;
    return this.jugadores.slice(indice_inicial, indice_inicial + this.jugadores_por_pagina);
  }

  paginaSiguiente() {
    if (this.pagina_actual < this.paginasTotales()) {
      this.pagina_actual++;
    }
  }

  paginaAnterior() {
    if (this.pagina_actual > 1) {
      this.pagina_actual--;
    }
  }

  paginasTotales() {
    return Math.ceil(this.jugadores.length / this.jugadores_por_pagina);
  }

  obtenerJugadoresNuevoFiltro() {
    this.jugadores = this.filtradoJugadoresServicio.obtenerJugadoresFiltrado();
    this.pagina_actual = 1;
  }

}
