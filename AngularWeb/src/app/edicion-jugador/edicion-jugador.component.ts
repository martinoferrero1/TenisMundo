import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormularioJugadorServicio } from '../formulario-jugador/formulario-jugador-servicio';

@Component({
  selector: 'app-edicion-jugador',
  templateUrl: './edicion-jugador.component.html',
  styleUrls: ['./edicion-jugador.component.css']
})
export class EdicionJugadorComponent implements OnInit {
  id_jugador: string = '';
 
  constructor(private http: HttpClient, private route: ActivatedRoute, private formularioJugadorServicio: FormularioJugadorServicio) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id_jugador = params['id'];
      this.id_jugador = id_jugador;
    });
  }

  editarJugador() {
    const jugador_modificado = this.formularioJugadorServicio.obtenerJugador();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const ruta_api = 'http://localhost:3000/Jugadores//actualizarjugador/' + this.id_jugador;
    this.http.put(ruta_api, jugador_modificado, { headers }).subscribe(() => {
      window.history.back();
    });
  }
}
