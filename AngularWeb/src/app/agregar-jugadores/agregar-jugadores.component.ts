import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormularioJugadorServicio } from '../formulario-jugador/formulario-jugador-servicio';

@Component({
  selector: 'app-agregar-jugadores',
  templateUrl: './agregar-jugadores.component.html',
  styleUrls: ['./agregar-jugadores.component.css']
})

export class AgregarJugadoresComponent {

  constructor(private http: HttpClient, private formularioJugadorServicio: FormularioJugadorServicio) { }

  agregarJugador() {
    const jugador_nuevo = this.formularioJugadorServicio.obtenerJugador();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post('http://localhost:3000/jugadores/insertarjugador', jugador_nuevo, { headers }).subscribe();
  }
}
