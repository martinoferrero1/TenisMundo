import { Component, OnInit, NgZone, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FiltradoJugadoresServicio } from './filtrado-jugadores-servicio';

interface Jugador {
  _id: String,
  nombre: String;
  pais: String;
  bandera_pais: String;
  entrenador?: String;
  retiro?: Number;
}

@Component({
  selector: 'app-filtrado-jugadores',
  templateUrl: './filtrado-jugadores.component.html',
  styleUrls: ['./filtrado-jugadores.component.css']
})
export class FiltradoJugadoresComponent implements OnInit {
  @ViewChild('campoNombre') campoNombre!: ElementRef<HTMLInputElement>;
  @ViewChild('campoApellido') campoApellido!: ElementRef<HTMLInputElement>;
  @ViewChild('campoPais') campoPais!: ElementRef<HTMLInputElement>;

  jugadores_totales: Jugador[] = [];
  jugadores_filtro: Jugador[] = [];
  estado_jugador: string = 'Cualquiera';

  @Input() jugadores_marcados: number = 0;
  @Output() nuevo_filtro = new EventEmitter<void>();

  constructor(private http: HttpClient, private ngZone: NgZone, private filtradoJugadoresServicio: FiltradoJugadoresServicio) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/Jugadores/').subscribe((data: any) => {
      this.ngZone.run(() => {
        this.jugadores_totales = data;
        this.jugadores_filtro = data;
        this.filtradoJugadoresServicio.setearJugadoresFiltrado(this.jugadores_filtro);
        this.nuevo_filtro.emit();
      });
    })
  }

  seleccionOpcion(event: any) {
    this.estado_jugador = event.target.value;
  }

  private cumpleFiltroEstado(jugador: Jugador) {
    console.log(this.estado_jugador);
    if (this.estado_jugador == 'Cualquiera' || (this.estado_jugador == 'Retirado' && jugador.hasOwnProperty('retiro')) || (this.estado_jugador == 'En actividad' && jugador.hasOwnProperty('entrenador')))
      return true;
    return false;
  }

  private cumpleFiltrosNombreApellido(original: String, input_nombre: String, input_apellido: String) {
    const original_modificado = original.toLowerCase();
    const input_nombre_modificado = input_nombre.toLowerCase();
    const input_apellido_modificado = input_apellido.toLowerCase();
    if (input_apellido == '')
      return original_modificado.includes(input_nombre_modificado); //la diferencia con el filtro de país es que acá si parte del nombre es así, cumple con el filtro
    else if (input_nombre == '')
      return original_modificado.includes(input_apellido_modificado);
    else {
      const combinacion1 = input_nombre_modificado + ' ' + input_apellido_modificado;
      const combinacion2 = input_apellido_modificado + ' ' + input_nombre_modificado;
      return ((original_modificado.includes(combinacion1)) || (original_modificado.includes(combinacion2)));
    }
  }

  private cumpleFiltroPais(original: String, input: String) {
    if (input == '') //ya que en caso de que el usuario deje vacío este campo, es como no tener en cuenta ese filtro
      return true;
    return original.toLowerCase() == input.toLowerCase();
  }

  aplicarFiltro() {
    let jugadores_nuevo_filtro: Jugador[] = [];
    for (let i = 0; i < this.jugadores_totales.length; i++) {
      const jugador = this.jugadores_totales[i];
      const cumple_estado = this.cumpleFiltroEstado(jugador);
      const cumple_nombre_apellido = this.cumpleFiltrosNombreApellido(jugador.nombre, this.campoNombre.nativeElement.value, this.campoApellido.nativeElement.value);
      const cumple_pais = this.cumpleFiltroPais(jugador.pais, this.campoPais.nativeElement.value);
      if (cumple_estado && cumple_nombre_apellido && cumple_pais)
        jugadores_nuevo_filtro.push(jugador);
    }
    this.jugadores_filtro = jugadores_nuevo_filtro;
    this.filtradoJugadoresServicio.setearJugadoresFiltrado(this.jugadores_filtro);
    this.nuevo_filtro.emit();
  }
}
