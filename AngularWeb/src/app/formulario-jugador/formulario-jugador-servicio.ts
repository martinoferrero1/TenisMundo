
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FormularioJugadorServicio {
    jugador_json: string = '';

    setearJugador(jugador_json: string) {
        this.jugador_json = jugador_json;
    }

    obtenerJugador() {
        return this.jugador_json;
    }
}