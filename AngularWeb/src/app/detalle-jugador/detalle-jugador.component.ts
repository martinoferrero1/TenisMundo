import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmacionServicio } from '../confirmacion/confirmacion-servicio';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.component.html',
  styleUrls: ['./detalle-jugador.component.css']
})

export class DetalleJugadorComponent implements OnInit {
  jugador: any;
  operacion: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private confirmacionServicio: ConfirmacionServicio) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id_jugador = params['id'];
      const ruta_api = 'http://localhost:3000/Jugadores/datosjugador/' + id_jugador;
      this.http.get(ruta_api).subscribe((data: any) => {
        this.jugador = data;
      })
    });
  }

  confirmar(operacion: string) {
    this.operacion = operacion;
    if (operacion == 'eliminar_especifico')
      this.confirmacionServicio.abrir(this.jugador.nombre);
    else if (this.operacion == 'editar')
      this.router.navigate(['/editarjugador/' + this.jugador._id]);

  }

  operacionConfirmada() {
    const jugador_eliminado = [this.jugador._id];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.delete('http://localhost:3000/Jugadores/eliminarjugadores', { headers, body: jugador_eliminado }).subscribe(() => {
      window.history.back();
    });
  }

}
