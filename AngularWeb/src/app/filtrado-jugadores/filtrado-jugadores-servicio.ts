
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FiltradoJugadoresServicio {
    jugadores_filtrado: any[] = [];

    setearJugadoresFiltrado(jugadores_filtrado: any[]) {
        this.jugadores_filtrado = jugadores_filtrado;
    }

    obtenerJugadoresFiltrado() {
        return this.jugadores_filtrado;
    }
}